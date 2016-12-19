'use scrict'
import Row from 'elemental/lib/components/Row'
import Col from 'elemental/lib/components/Col'
import Container from 'elemental/lib/components/Container'
import FormSelect from 'elemental/lib/components/FormSelect'
import Button from 'react-bootstrap/lib/Button'
import React, { PropTypes, Component } from 'react'
import hashHistory from 'react-router/lib/hashHistory'
import { getUserCategory, syncWithServer, getCategoryFromServer, getAllCategory, syncAllCategoryAndContent } from '../ajaxCalls/request'
import { getEmailFromLocalStrg } from '../localStorage/localStorageMethods'
import { initialState } from '../reducers/page'
import Buttons_Row from './sub-components/Buttons_Row'

function setOptions() {
    var optionsFromServer;
    let defaultOptions = [
        {value : 'Sport', label: 'Sport'},
        {value : 'Food', label: 'Food'},
        {value : 'Nature', label: 'Nature'}
    ];
    optionsFromServer = JSON.parse(localStorage.getItem('options'));
    return optionsFromServer ? optionsFromServer : defaultOptions;
}

function setSelectedOptions() {
    let selectedOptions = JSON.parse(localStorage.getItem('selected'));
    return selectedOptions;
}

export default class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: initialState
        }
    }

    logChange(val) {
        if (getEmailFromLocalStrg()) {
            this.props.syncCatAndRating();
            localStorage.setItem('selected', JSON.stringify(val));
            getCategoryFromServer(localStorage.getItem('selected'));
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
        this.props.switchOfflineOnLineMode();
        getAllCategory();
        localStorage.setItem('isOffline', !this.props.isOffline);
        if(this.props.isOffline) {
            syncAllCategoryAndContent();
            getAllCategory();
        }
    }

    render() {
        const { phrase, counter, hits, email, hidden, isOffline, clearErrorMsg, unAuthorizedMsg } = this.props
        return (
                <div className='phrase-col'>

                <div className='header'>
                    <p className='header-text'>Phrase generator </p>
                </div>
                <Row className='select-comp'>
                    <Col xs="50%" sm="40%" md="25%" lg="40%">
                        <FormSelect className='select-category' options={setOptions()}
                            onChange={this.logChange.bind(this)}
                        />
                    </Col>
                    <Col xs='1/3'>
                        <Button className='btn-sunc btn-default'
                            onClick={ this.addCategory.bind(this) }>
                            <i className="fa fa-plus" aria-hidden="truen"></i>
                        </Button>
                    </Col>
                    <div className='col-xs-12'>
                        <p className='selected-category'>Now selected: <strong>{setSelectedOptions()}</strong></p>
                    </div>
                </Row>
                <div className='phrase-row row'>
                    <div className='col-xs-6 position-col'>
                        <span className='position'>Position: {counter} </span>
                    </div>
                    <div className='col-xs-6 hits-col'>
                        <span className='hits'>Hits: {hits} </span>
                    </div>
                    <div className='phrase col-xs-12'>
                        <p><strong className='phrase'>{phrase}</strong></p>
                    </div>
                </div>
                <div className={isOffline ? 'row offline-row hide' : 'row offline-row'}>
                    <div className='col-xs-6'>
                        <span>Go OffLine</span>
                        <Button onClick={this.preparingToOffline.bind(this)} className='btn btn-default offline-btn'>
                            <i className="fa fa-toggle-on"></i>
                        </Button>
                    </div>
                </div>
                <div className={isOffline ? 'row online-row' : 'row online-row hide'}>
                    <div className='col-xs-12'>
                        <span>Go OnLine </span>
                        <Button onClick={this.preparingToOffline.bind(this)} className='btn btn-default offline-btn'>
                            <i className="fa fa-toggle-off"></i>
                        </Button><span className='ready-msg'>Now you can go offline</span>
                    </div>
                </div>
                <span className={ getEmailFromLocalStrg() ? 'col-xs-12 unauthorized-msg hide' : 'col-xs-12 unauthorized-msg' }>
                    <span>{ unAuthorizedMsg }</span>
                </span>
                <div className='row footer'>
                    <div className='col-xs-12 footer-text'>
                        <span>
                            2016 Phrase generator
                            <i className="fa fa-apple apple-icon"></i>
                            <i className="fa fa-android android-icon"></i>
                        </span>
                    </div>
                </div>
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
    isOffline: React.PropTypes.bool,
    clearErrorMsg: React.PropTypes.func,
    unAuthorizedMsg: React.PropTypes.string
}
