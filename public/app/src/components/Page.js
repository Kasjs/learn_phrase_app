'use scrict'

import React, { PropTypes, Component } from 'react'
import hashHistory from 'react-router/lib/hashHistory'
import { getUserCategory, syncWithServer, getCategoryFromServer, getAllCategory,
    syncAllCategoryAndContent } from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getCategoryOptions, getSelectedCategory, setSelectedCategory,
    setIsOfflineField, removeIsOfflineField, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { initialState } from '../reducers/page'
import { defaultCatagories } from '../constants/defaultCatagories'
import Buttons_Row from './pageSubComponents/Buttons_Row'
import OnlineRow from './pageSubComponents/OnlineRow'
import OfflineRow from './pageSubComponents/OfflineRow'
import PhraseRow from './pageSubComponents/PhraseRow'
import SelectedRow from './pageSubComponents/SelectedRow'
import Select from './pageSubComponents/Select'

// hide/show component function
export function hideOrShow(arayOfClass) {
    const componentClass = arayOfClass;
    if (!getEmailFromLocalStrg()) {
        componentClass.push('hide-block');
    }
    return componentClass.join(' ');
}

// fadeOn/Off effect function
function fadeOn(className) {
    let componentClass = ['phrase-row'];
    if (className) {
        componentClass.push(className);
    } else {
        return componentClass.join(' ');
    }
    return componentClass.join(' ');
}

// working functions
export function setOptions() {
    let optionsFromServer;
    optionsFromServer = JSON.parse(getCategoryOptions());
    return optionsFromServer ? optionsFromServer : defaultCatagories;
}

export function setSelectedOptions() {
    let selectedOptions = JSON.parse(getSelectedCategory());
    return selectedOptions;
}

// class component
export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: initialState
        }
    }

    selectCategory(val) {
        let that = this;
        if (getEmailFromLocalStrg() && val !== '') {
            this.props.fadeOn();
            this.props.syncCatAndRating();
            Promise.resolve(val).then(function(val) {
                setSelectedCategory(JSON.stringify(val));
            }).then(function(val) {
                getCategoryFromServer(getSelectedCategory());
                setTimeout(function() { that.props.fadeOff(); }, 700);
            });
            this.props.getNextPhrase();
            this.props.clearMsgUnauthorizedUsers();
        }
        this.props.showMsgUnauthorizedUsers();
    }

    addCategory() {
        if (getEmailFromLocalStrg()) {
            hashHistory.push('addCategory');
            this.props.clearErrorMsg();
        }
        this.props.showMsgUnauthorizedUsers();
    }

    preparingToOffline() {
        let isDelOffline = true;
        this.props.switchOfflineOnLineMode();
        getAllCategory();
        setIsOfflineField(!this.props.isOffline);
        if(this.props.isOffline === true) {
            syncAllCategoryAndContent();
            getAllCategory();
            isDelOffline = !isDelOffline;
        }
        if(!isDelOffline) {
            removeIsOfflineField();
        }
    }

    render() {
        const { phrase, counter, hits, lengthOfCategory, email, hidden, isOffline,
            clearErrorMsg, unAuthorizedMsg, showSpinner, hide } = this.props;
        const { getBackPhrase, getNextPhrase, switchLanguage, getPhrase } = this.props;

        return (
            <section className='page'>
                <span>
                    <i className={ showSpinner ? 'fa fa-spinner fa-pulse fa-5x fa-fw' : 'fa fa-spinner fa-pulse fa-3x fa-fw hide' }></i>
                </span>
                <section className={ fadeOn(hide) }>
                    <header className='header flex-item'>
                        <p className='header-text'> Phrase generator </p>
                    </header>
                    <section>
                        <Select selectCategory={this.selectCategory.bind(this)} addCategory={ this.addCategory.bind(this) } />
                        <h3 className={ getEmailFromLocalStrg() ? 'hide' : 'show flex-container-welcome' }>
                            Welcome to PG app, for continue please Sign In or Sign Up.
                        </h3>
                        <SelectedRow/>
                        <PhraseRow getBackPhrase={ getBackPhrase } getNextPhrase={ getNextPhrase }
                            switchLanguage={ switchLanguage } getPhrase={ getPhrase }
                            counter={ counter } hits={ hits } email={ email }
                            phrase={ phrase } unAuthorizedMsg={ unAuthorizedMsg }
                        />
                        <OfflineRow isOffline={ isOffline }
                            preparingToOffline={ this.preparingToOffline.bind(this) } />
                        <OnlineRow isOffline={ isOffline }
                            preparingToOffline={ this.preparingToOffline.bind(this) } />
                    </section>
                    <footer className='row footer'>
                        <div className='col-xs-12 footer-text'>
                            <span>
                                2016 Phrase generator
                                <i className="fa fa-apple apple-icon"></i>
                                <i className="fa fa-android android-icon"></i>
                            </span>
                        </div>
                    </footer>
                </section>
            </section>
        )
    }
}

Page.propTypes = {
    phrase : React.PropTypes.string,
    counter: React.PropTypes.number,
    hits: React.PropTypes.number,
    email : React.PropTypes.string,
    hidden : React.PropTypes.bool,
    isOffline: React.PropTypes.bool.isRequired,
    clearErrorMsg: React.PropTypes.func,
    unAuthorizedMsg: React.PropTypes.string
}

Page.defaultProps = {
    hidden: false
}
