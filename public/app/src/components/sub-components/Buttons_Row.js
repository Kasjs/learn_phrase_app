import React, { PropTypes, Component } from 'react'
import * as pageActions from '../../actions/pageActions';
import { getEmailFromLocalStrg } from '../../localStorage/localStorageMethods'

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
            <div className='flex-container btns-row'>
                <div className={ getEmailFromLocalStrg() ? 'col-xs-12 btn-col' : 'col-xs-12 btn-col hide' }>
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
