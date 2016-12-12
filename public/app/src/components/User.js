import { Button, Row, Col, Container, FormSelect, } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Link, browserHistory, hashHistory } from 'react-router'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'

export default class User extends Component {

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
            <Col xs='1/3'>
                <div className={ getHiddenFromLocalStrg()  ? 'hide' : 'show' }>
                    <Button className='login-btn' onClick={() => {hashHistory.push('login'), clearErrorMsg()}}>
                        <i className="fa fa-sign-in" aria-hidden="true"></i>
                    </Button>
                    <Button className='register-btn' onClick={() => {hashHistory.push('register'), clearErrorMsg()}}
                        >Sign Up
                    </Button>
                </div>
                <span className={ getHiddenFromLocalStrg() ? 'show user-email' : 'hide user-email' }>
                    <i className='fa fa-user' aria-hiden='true'></i>
                </span>
                <Button className={ getHiddenFromLocalStrg() ? 'show log-out-btn' : 'hide log-out-btn'}
                    onClick={() => this.logoutAndClearPageInfo() } >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                </Button>
            </Col>
        )
    }
}

User.propTypes = {
    email : React.PropTypes.string,
    logOutUser : React.PropTypes.func

}
