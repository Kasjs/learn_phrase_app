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
        const { email, isAuthButtonsHidden, isAuth, logOutUser, counter, phrase, hits } = this.props;
        return (
            <Col xs='1/3'>
                <div className={ getHiddenFromLocalStrg()  ? 'hide' : 'show' }>
                    <Button className='login-btn' onClick={() => hashHistory.push('login')}
                    type='hollow-primary'>Sign In
                    </Button>
                    <Button className='register-btn' onClick={() => hashHistory.push('register')}
                    type='hollow-primary'>Sign Up
                    </Button>
                </div>
                <span className='user-email'>{ getEmailFromLocalStrg() }</span>
                <Button className={ getHiddenFromLocalStrg() ? 'show log-out-btn' : 'hide log-out-btn'}
                    type='hollow-primary' onClick={ () => this.logoutAndClearPageInfo() } >Sign out
                </Button>
            </Col>
        )
    }
}
