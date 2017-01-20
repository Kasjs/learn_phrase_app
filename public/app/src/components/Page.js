'use scrict'

import FormSelect from 'elemental/lib/components/FormSelect'
import React, { PropTypes, Component } from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import hashHistory from 'react-router/lib/hashHistory'
import { getUserCategory, syncWithServer, getCategoryFromServer, getAllCategory,
    syncAllCategoryAndContent } from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getCategoryOptions, getSelectedCategory, setSelectedCategory,
    setIsOfflineField, removeIsOfflineField, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { initialState } from '../reducers/page'
import Buttons_Row from './sub-components/Buttons_Row'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//hide show component function
function hideOrShow(arayOfClass) {
    const componentClass = arayOfClass;
    if (!getEmailFromLocalStrg()) {
        componentClass.push('hide-block');
    }
    return componentClass.join(' ');
}
//animation function
function animation(arayOfClass) {
    const componentClass = arayOfClass;
    componentClass.push('animation');
    return componentClass.join(' ');
}

//function components

function Select(props) {
    const componentClass = ['select-comp', 'row'];
    return (
        <section className={ hideOrShow(componentClass) }>
            <div className='select-options col-xs-6 col-sm-4 col-md-3 col-lg-2'>
                <FormSelect className='select-category' options={ setOptions() } firstOption='Select...'
                    onChange={ props.selectCategory }
                />
            </div>
            <div className='col-xs-4 btn-sunc-col'>
                <button className='btn-sunc btn'
                    onClick={ props.addCategory }>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
                <button className='btn-configure btn' onClick={ () => { getAllCategory(); hashHistory.push('configure') } }>
                    <span className="fa fa-wrench configure "></span>
                </button>
            </div>
        </section>
    )
}

function SelectedRow(props) {
    const componentClass = ['select-row', 'row'];
    return (
        <section className={ hideOrShow(componentClass) }>
            <div className='col-xs-6'>
                <span className='selected-category'> Now selected: <strong>{ setSelectedOptions() }</strong></span>
            </div>
        </section>
    )
}

function PhraseRow(props) {
    const componentClass = ['phrase-row', 'row'];
    return (
        <section className={ hideOrShow(componentClass) }>
            <div className='col-xs-6 position-col'>
                <span className='position'>
                    Position: <span className='counter'>{ props.counter }</span>
                </span>
            </div>
            <div className='col-xs-6 hits-col'>
                <span className='hits'>
                    Hits: <span className='hits-number'>{ props.hits }</span>
                </span>
            </div>
            <div key='ph' className='phrase col-xs-12'>
                <span className='phrase col-xs-12'>{ props.phrase }</span>
            </div>
        </section>
    )
}

function OfflineRow(props) {
    return (
        <section className={ props.isOffline ? 'row offline-row hide' : 'row offline-row' }>
            <div className={ hideOrShow(['col-xs-6']) }>
                <span> Go Offline </span>
                <button onClick={ props.preparingToOffline } className='offline-btn btn'>
                    <i aria-hidden='true' className="fa fa-toggle-on fa-1x"></i>
                </button>
            </div>
        </section>
    )
}

function OnlineRow(props) {
    return (
        <section className={ props.isOffline ? 'row online-row' : 'row online-row hide' }>
            <div className='col-xs-12'>
                <span> Go OnLine </span>
                <button onClick={ props.preparingToOffline } className='online-btn btn'>
                    <i className="fa fa-toggle-off"></i>
                </button><span className='ready-msg'> Now you can go offline</span>
            </div>
        </section>
    )
}

//working functions

function setOptions() {
    let optionsFromServer;
    let defaultOptions = [
        {value : 'Sport', label: 'Sport'},
        {value : 'Food', label: 'Food'},
        {value : 'Nature', label: 'Nature'}
    ];
    optionsFromServer = JSON.parse(getCategoryOptions());
    return optionsFromServer ? optionsFromServer : defaultOptions;
}

function setSelectedOptions() {
    let selectedOptions = JSON.parse(getSelectedCategory());
    return selectedOptions;
}

//class component

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: initialState
        }
    }

    selectCategory(val) {
        if (getEmailFromLocalStrg() && val !== '...Select') {
            this.props.syncCatAndRating();
            setSelectedCategory(JSON.stringify(val));
            getCategoryFromServer(getSelectedCategory());
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
        const { phrase, counter, hits, lengthOfCategory, email, hidden, isOffline, clearErrorMsg,
            unAuthorizedMsg } = this.props
        return (
            <div className='phrase-row'>
                <header className='header flex-item'>
                    <p className='header-text'> Phrase generator </p>
                </header>
                <section>
                    <Select selectCategory={this.selectCategory.bind(this)} addCategory={this.addCategory.bind(this)} />
                    <h3 className={ getEmailFromLocalStrg() ? 'hide' : 'show flex-container-welcome' }>
                        Welcome to PG app, for continue please Sign In or Sign Up.
                    </h3>
                    <SelectedRow/>
                    <PhraseRow counter={counter} hits={hits} email={email} phrase={phrase} unAuthorizedMsg={unAuthorizedMsg}/>
                    <OfflineRow isOffline={isOffline} preparingToOffline={this.preparingToOffline.bind(this)} />
                    <OnlineRow isOffline={isOffline} preparingToOffline={this.preparingToOffline.bind(this)} />
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
            </div>
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
