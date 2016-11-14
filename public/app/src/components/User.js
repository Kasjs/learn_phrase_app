import { Button, Row, Col, Container, FormSelect, } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Link, browserHistory, hashHistory } from 'react-router'

export default class User extends Component {
    getEmail() {
        let email = localStorage.getItem('email');
        return email;
    }
    render() {
        const { email, hidden } = this.props
        return (
            <Col xs='1/3'>
                <div className={ email ? 'hide' : 'show'}>
                    <Button className='login-btn' onClick={() => hashHistory.push('login')}
                    type='hollow-primary'>Sign In
                    </Button>
                    <Button className='register-btn' onClick={() => hashHistory.push('register')}
                    type='hollow-primary'>Sign Up
                    </Button>
                </div>
                <span className='user-email'>{this.getEmail()}</span>
            </Col>
        )
    }
}
