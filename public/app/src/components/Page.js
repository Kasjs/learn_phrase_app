import { Button, Row, Col, Container, FormSelect, } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { getCategoryFromServer } from '../ajaxCalls/request'
import { Link, browserHistory, hashHistory } from 'react-router'
import { getUserCategory } from '../ajaxCalls/request'

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
        const { page, phrase, counter, hits, email, hidden} = this.props
        return <div className='phrase-col'>
            <Row className='select-comp'>
                <Col xs="50%" sm="40%" md="25%" lg="40%">
                    <FormSelect className='select-category' options={setOptions()}
                        firstOption="Select"
                        onChange={this.logChange.bind(this)}
                    />
                </Col>
                <Col xs='1/3'>
                    <Button className='btn-sunc' onClick={() => hashHistory.push('addCategory')} type='hollow-success'>Add +
                    </Button>
                </Col>
                <Col>
                    <p className='selected-category'>Now selected: <strong>{setSelectedOptions()}</strong></p>
                </Col>
            </Row>
            <Row className='phrase-row'>
                <Col xs="100%" sm="100%" md="100%" lg="100%">
                    <span>Position: {counter} </span><br/>
                    <span>Hits: {hits} </span>
                    <p><strong className='phrase'>{phrase}</strong></p>
                </Col>
            </Row>
            <Row className='btns-row'>
                <Col xs="100%" sm="100%" md="100%" lg="100%">
                    <Button className='buttons btn-back btn btn-lg'
                        onClick={this.onBackPhraseBtnClick.bind(this)}>Back
                    </Button>
                    <Button className='buttons btn-next btn btn-lg'
                        onClick={this.onGetNextPhraseBtnClick.bind(this)}>Next
                    </Button>
                    <Button className='buttons btn-translate btn btn-lg'
                        onClick={this.onSwitchLanguage.bind(this)} >Translate
                    </Button>
                    <Button className='buttons btn-random btn btn-lg'
                        onClick={this.onGetRandomPhraseBtnClick.bind(this)}>Random
                    </Button>
                </Col>
            </Row>
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
