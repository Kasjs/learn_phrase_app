'use strict'
import Button  from 'react-bootstrap/lib/Button'
import React, { PropTypes, Component } from 'react'
import * as pageActions from '../../actions/pageActions';
export default class Buttons_Row  extends Component {

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

    render() {
        const { getBackPhrase, getNextPhrase, getRandomPhrase, switchLanguage } = this.props;
        return (
            <div className='row btns-row'>
                <div className='col-xs-12'>
                    <Button className='buttons btn-back btn btn-sm'
                        onClick={ this.onBackPhraseBtnClick.bind(this) }>
                        <i className="fa fa-arrow-left"></i>
                    </Button>
                    <Button className='buttons btn-next btn btn-sm'
                        onClick={ this.onGetNextPhraseBtnClick.bind(this) }>
                        <i className="fa fa-arrow-right"></i>
                    </Button>
                    <Button className='buttons btn-translate btn btn-sm'
                        onClick={ this.onSwitchLanguage.bind(this) }>Translate
                    </Button>
                    <Button className='buttons btn-random btn btn-sm'
                        onClick={ this.onGetRandomPhraseBtnClick.bind(this) }>Random
                    </Button>
                </div>
            </div>
        )
    }
}
