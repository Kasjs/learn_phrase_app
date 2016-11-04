import { Button, Row, Col, Container, FormSelect, } from 'elemental'
import React, { PropTypes, Component } from 'react'
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
        console.log("Selected: " + val);
        this.props.getSelectedCategory(val);
    }
    render() {
        const { page, phrase, counter } = this.props
            return <div className='phrase-col'>
                <Row className='select-comp'>
                    <Col xs="65%" sm="40%" md="25%" lg="20%">
                        <FormSelect className='select-category' options={[
                            {value : 'Food', label: 'Food'},
                            {value : 'Sport', label: 'Sport'},
                            {value : 'Nature', label: 'Nature'}
                        ]} firstOption='Select Category' onChange={this.logChange.bind(this)} />
                    </Col>
                </Row>
                <Row className='phrase-row'>
                    <Col xs="100%" sm="100%" md="70%" lg="50%">
                        <span>{counter}</span>
                        <p><strong className='lead'>{phrase}</strong></p>
                    </Col>
                </Row>
                <Row className='btns-row'>
                    <Col xs="100%" sm="100%" md="70%" lg="50%">
                        <Button className='buttons' size='lg'  type='primary' onClick={this.onBackPhraseBtnClick.bind(this)}>Back</Button>
                        <Button className='buttons' size='lg'  type='success' onClick={this.onGetNextPhraseBtnClick.bind(this)}>Next</Button>
                        <Button className='buttons' size='lg'  type='warning' onClick={this.onSwitchLanguage.bind(this)} >Translate</Button>
                        <Button className='buttons' size='lg'  type='danger' onClick={this.onGetRandomPhraseBtnClick.bind(this)}>Random</Button>
                    </Col>
                </Row>
            </div>
    }
}

Page.propTypes = {
    page: PropTypes.string.isRequired
}
