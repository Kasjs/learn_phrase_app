'use scrict'

import React, { PropTypes, Component } from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import hashHistory from 'react-router/lib/hashHistory'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { initialState } from '../reducers/userAuth'

// function component

function RegButtons(props) {
    return (
        <section className='auth-btn'>
            <div className={ getHiddenFromLocalStrg()  ? 'hide' : 'show' }>
                <button className='login-btn btn' onClick={() => {hashHistory.push('login'), props.clearErrorMsg()}}
                    >Sign In
                </button>
                <button className='register-btn btn' onClick={() => {hashHistory.push('register'), props.clearErrorMsg()}}
                    >Sign Up
                </button>
            </div>
            <button className={ getHiddenFromLocalStrg() ? 'log-out-btn show btn' : 'hide log-out-btn btn'}
                onClick={() => props.logoutAndClearPageInfo() } >
                <i aria-hidden='true' className="fa fa-sign-out fa-1x"></i>
            </button>
        </section>
    )
}

//class component

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
            <RegButtons logOutUser={ logOutUser } clearErrorMsg={ clearErrorMsg }
                logoutAndClearPageInfo={ this.logoutAndClearPageInfo.bind(this) }
            />
        )
    }
}

User.propTypes = {
    email : React.PropTypes.string,
    logOutUser : React.PropTypes.func,
    clearErrorMsg: React.PropTypes.func
}
