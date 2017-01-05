'use scrict'

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
            <section className='col-xs-12 auth-btn'>
                <div className={ getHiddenFromLocalStrg()  ? 'hide' : 'show' }>
                    <button className='login-btn btn' onClick={() => {hashHistory.push('login'), clearErrorMsg()}}>
                        <i className="fa fa-sign-in"></i>
                    </button>
                    <button className='register-btn btn' onClick={() => {hashHistory.push('register'), clearErrorMsg()}}
                        >Sign Up
                    </button>
                </div>
                <span className={ getHiddenFromLocalStrg() ? 'show user-email' : 'hide user-email' }>
                    <i className='fa fa-user'></i>
                </span>
                <button className={ getHiddenFromLocalStrg() ? 'show log-out-btn' : 'hide log-out-btn'}
                    onClick={() => this.logoutAndClearPageInfo() } >
                    <i className="fa fa-sign-out"></i>
                </button>
            </section>
        )
    }
}

User.propTypes = {
    email : React.PropTypes.string,
    logOutUser : React.PropTypes.func,
    clearErrorMsg: React.PropTypes.func
}
