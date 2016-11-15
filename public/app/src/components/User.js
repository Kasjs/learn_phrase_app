import { Button, Row, Col, Container, FormSelect, } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Link, browserHistory, hashHistory } from 'react-router'
import { logOut } from '../localStorage/localStorageMethods'

export default class User extends Component {

    render() {
        const { email, hidden, isAuth } = this.props
        return (
            <Col xs='1/3'>
                <div className={ hidden ? 'hide' : 'show' }>
                    <Button className='login-btn' onClick={() => hashHistory.push('login')}
                    type='hollow-primary'>Sign In
                    </Button>
                    <Button className='register-btn' onClick={() => hashHistory.push('register')}
                    type='hollow-primary'>Sign Up
                    </Button>
                </div>
                <span className='user-email'>{email}</span>
                <Button className={ hidden ? 'show log-out-btn' : 'hide log-out-btn'}
                    type='hollow-primary' onClick={ logOut() } >Sign out
                </Button>
                <span className='user-hidden'>{isAuth}</span>
            </Col>
        )
    }
}
