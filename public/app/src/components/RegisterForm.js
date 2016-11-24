import { Button, Row, Col, Container, FormSelect, FormField, FormInput } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg, getEmailErrorMsg, getPasswordErrorMsg } from '../localStorage/localStorageMethods'
import { Link, browserHistory, hashHistory } from 'react-router'
import { register, transferMessages } from '../ajaxCalls/request'

class RegisterForm extends Component {

    handleSubmit(user) {
        this.props.userActions.registerNewUser(user);
        this.props.userActions.showMassage(localStorage.getItem('msg-email'), localStorage.getItem('msg-password'));

    }

    render() {
        let { user } = this.props;
        let { msgEmail, msgPassword } = this.props.userAuth;
        return (
            <div>
                <Col xs='100%'>
                    <h2 className='login-header'>Register</h2>
                </Col>
                <Row>
                    <Col className='req-form-cont' xs='50%'>
                        <Form className='form' model="user" onSubmit={(user) => this.handleSubmit(user)}>
                            <Field className='form-group email-label' model="user.email">
                                <label>Email addres:</label>
                                <input className='form-control' type="email" placeholder='Email' />
                            </Field>

                            <Field className='form-group' model="user.password">
                                <label>Password: </label>
                                <input className='form-control' type="password" placeholder='Password' />
                            </Field>

                            <Field className='form-group' model="user.repPassword">
                                <label>Repeat Password: </label>
                                <input className='form-control' type="password" placeholder='Repeat Password' />
                            </Field>

                            <Button submit className='submit-btn' type="hollow-primary">Submit</Button>
                            <span className={ getEmailErrorMsg() === 'undefined' ? 'hide msg-email-error' : 'show msg-email-error' }>{ msgEmail }</span>
                            <span className={ getPasswordErrorMsg() === 'undefined' ? 'hide msg-password-error' : 'show msg-password-error' }>{ msgPassword }</span>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth
    }
}

function mapDispatchToProps(dispatch) {
		return {
			userActions: bindActionCreators(userActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
