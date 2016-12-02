import { Row, Col, Container, FormSelect, } from 'elemental'
import { Button } from 'react-bootstrap'
import React, { PropTypes, Component } from 'react'
import { getCategoryFromServer } from '../ajaxCalls/request'
import { Link, browserHistory, hashHistory } from 'react-router'
import { getUserCategory, syncWithServer } from '../ajaxCalls/request'

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

    onGetUsercategory() {
        getUserCategory();
    }

    render() {
        const { page, phrase, counter, hits, email, hidden, } = this.props
        return <div className='phrase-col container-fluid'>
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
                        getCategoryFromServer(localStorage.getItem('selected')),
                        syncWithServer(),
                        hashHistory.push('addCategory'); }}>
                        <i className="fa fa-plus" aria-hidden="truen"></i>
                    </Button>
                </Col>
                <Col>
                    <p className='selected-category'>Now selected: <strong>{setSelectedOptions()}</strong></p>
                </Col>
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
