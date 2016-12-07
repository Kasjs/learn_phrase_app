import { Row, Col, Container, FormSelect, } from 'elemental'
import { Button } from 'react-bootstrap'
import React, { PropTypes, Component } from 'react'
import { Link, browserHistory, hashHistory } from 'react-router'
import { getUserCategory, syncWithServer, getCategoryFromServer, getAllCategory, syncAllCategoryAndContent } from '../ajaxCalls/request'

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
    onBackPhraseBtnClick() {
        this.props.getBackPhrase();
    }
    onGetNextPhraseBtnClick() {
        this.props.getNextPhrase();
    }
    onGetRandomPhraseBtnClick() {
        this.props.getRandomPhrase();
    }
    onSwitchLanguage() {
        this.props.switchLanguage();
        this.props.getPhrase();
    }
    logChange(val) {
        this.props.syncCatAndRating();
        localStorage.setItem('selected', JSON.stringify(val));
        getCategoryFromServer(localStorage.getItem('selected'));
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
        const { page, phrase, counter, hits, email, hidden, isOffline } = this.props
        return <div className='phrase-col'>

            <div className='header'>
                <p className='header-text'>Phrase generator </p>
            </div>

            <Row className='select-comp'>
                <Col xs="50%" sm="40%" md="25%" lg="40%">
                    <FormSelect className='select-category' options={setOptions()}
                        firstOption="Select"
                        onChange={this.logChange.bind(this)}
                    />
                </Col>
                <Col xs='1/3'>
                    <Button className='btn-sunc btn-default' onClick={() => {
                        hashHistory.push('addCategory'); }}>
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
                        <i className="fa fa-toggle-on" aria-hidden="true"></i>
                    </Button>
                </div>
            </div>
            <div className={isOffline ? 'row online-row' : 'row online-row hide'}>
                <div className='col-xs-12'>
                    <span>Go OnLine </span>
                    <Button onClick={this.preparingToOffline.bind(this)} className='btn btn-default offline-btn'>
                        <i className="fa fa-toggle-off" aria-hidden="true"></i>
                    </Button><span className='ready-msg'>Now you can go offline</span>
                </div>
            </div>


            <div className='row btns-row'>
                <div className='col-xs-12'>
                    <Button className='buttons btn-back btn btn-sm'
                        onClick={this.onBackPhraseBtnClick.bind(this)}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Button>
                    <Button className='buttons btn-next btn btn-sm'
                        onClick={this.onGetNextPhraseBtnClick.bind(this)}>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </Button>
                    <Button className='buttons btn-translate btn btn-sm'
                        onClick={this.onSwitchLanguage.bind(this)} >Translate
                    </Button>
                    <Button className='buttons btn-random btn btn-sm'
                        onClick={this.onGetRandomPhraseBtnClick.bind(this)}>Random
                    </Button>
                </div>
            </div>

            <div className='row footer'>
                <div className='col-xs-12 footer-text'>
                    <span>
                        2016 Phrase generator
                        <i className="fa fa-apple apple-icon" aria-hidden="true"></i>
                        <i className="fa fa-android android-icon" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        </div>
    }
}

Page.propTypes = {
    phrase : React.PropTypes.string,
    counter: React.PropTypes.number,
    hits: React.PropTypes.number,
    email : React.PropTypes.string,
    hidden : React.PropTypes.bool

}
