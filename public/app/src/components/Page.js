import { Button, Row, Col, Container, FormSelect, } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { getCategoryFromServer } from '../ajaxCalls/request'
import { Link, browserHistory, hashHistory } from 'react-router'

let options = [
    {value : 'Food', label: 'Food'},
    {value : 'Sport', label: 'Sport'},
    {value : 'Nature', label: 'Nature'}];

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
        console.log(val);
        getCategoryFromServer(val);
        localStorage.setItem('selected', JSON.stringify(val));

    }
    onSyncCatAndRating() {
        this.props.syncCatAndRating();
    }

    render() {
        const { page, phrase, counter, hits, email, hidden} = this.props
            return <div className='phrase-col'>
                <Row className='select-comp'>
                    <Col xs="50%" sm="40%" md="25%" lg="40%">
                        <FormSelect className='select-category' options={options}
                            firstOption="Select"
                            onChange={this.logChange.bind(this)}
                        />
                    </Col>
                    <Col xs='1/3'>
                        <Button className='btn-sunc' type='hollow-success'
                            onClick={this.onSyncCatAndRating.bind(this)}>Sync
                        </Button>
                    </Col>
                    <Col>
                        <p className='selected-category'>Now selected: <strong>{setSelectedOptions()}</strong></p>
                    </Col>
                </Row>
                <Row className='phrase-row'>
                    <Col xs="100%" sm="100%" md="70%" lg="50%">
                        <span>Position: {counter} </span><br/>
                        <span>Hits: {hits} </span>
                        <p><strong className='phrase'>{phrase}</strong></p>
                    </Col>
                </Row>
                <Row className='btns-row'>
                    <Col xs="100%" sm="100%" md="70%" lg="50%">
                        <Button className='buttons btn btn-lg' type='primary'
                            onClick={this.onBackPhraseBtnClick.bind(this)}>Back
                        </Button>
                        <Button className='buttons btn btn-lg' type='success'
                            onClick={this.onGetNextPhraseBtnClick.bind(this)}>Next
                        </Button>
                        <Button className='buttons btn btn-lg' type='warning'
                            onClick={this.onSwitchLanguage.bind(this)} >Translate
                        </Button>
                        <Button className='buttons btn btn-lg' type='danger'
                            onClick={this.onGetRandomPhraseBtnClick.bind(this)}>Random
                        </Button>
                    </Col>
                </Row>
            </div>
    }
}
