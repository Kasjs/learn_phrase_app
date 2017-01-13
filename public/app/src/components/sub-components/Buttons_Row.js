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
                <div className='col-xs-12 btn-col'>
                    <button className='buttons btn-back btn'
                        onClick={ this.onBackPhraseBtnClick.bind(this) }>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <button className='buttons btn-next btn'
                        onClick={ this.onGetNextPhraseBtnClick.bind(this) }>
                        <i className="fa fa-arrow-right"></i>
                    </button>
                    <button className='buttons btn-translate btn'
                        onClick={ this.onSwitchLanguage.bind(this) }>Translate
                    </button>
                    <button className='buttons btn-random btn'
                        onClick={ this.onGetRandomPhraseBtnClick.bind(this) }>Random
                    </button>
                </div>
            </div>
        )
    }
}
Buttons_Row.propTypes = {
    getBackPhrase : React.PropTypes.func,
    getNextPhrase: React.PropTypes.func,
    getRandomPhrase: React.PropTypes.func,
    switchLanguage : React.PropTypes.func
}
