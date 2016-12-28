'use scrict'
import Button from 'react-bootstrap/lib/Button'
import React, { PropTypes, Component } from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import hashHistory from 'react-router/lib/hashHistory'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { initialState } from '../reducers/userAuth'

export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: initialState
        }
        this.logoutAndClearPageInfo.bind(this);
    }
    logoutAndClearPageInfo() {
        this.props.logOutUser();
        return function(dispatch) {
            dispatch({
                type: 'CLEAR_PAGE_INFO_AND_LOGOUT'
            })
        }
    }

    render() {
        const { email, logOutUser, clearErrorMsg } = this.props;
        return (
            <div className='col-xs-12 auth-btn'>
                <div className={ getHiddenFromLocalStrg()  ? 'hide' : 'show' }>
                    <Button className='login-btn' onClick={() => {hashHistory.push('login'), clearErrorMsg()}}>
                        <i className="fa fa-sign-in"></i>
                    </Button>
                    <Button className='register-btn' onClick={() => {hashHistory.push('register'), clearErrorMsg()}}
                        >Sign Up
                    </Button>
                </div>
                <span className={ getHiddenFromLocalStrg() ? 'show user-email' : 'hide user-email' }>
                    <i className='fa fa-user'></i>
                </span>
                <Button className={ getHiddenFromLocalStrg() ? 'show log-out-btn' : 'hide log-out-btn'}
                    onClick={() => this.logoutAndClearPageInfo() } >
                    <i className="fa fa-sign-out"></i>
                </Button>
            </div>
        )
    }
}

User.propTypes = {
    email : React.PropTypes.string,
    logOutUser : React.PropTypes.func,
    clearErrorMsg: React.PropTypes.func
}
