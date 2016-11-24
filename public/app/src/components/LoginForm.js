import { Button, Row, Col, Container, FormSelect, FormField, FormInput } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'
import { connect } from 'react-redux'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { login } from '../ajaxCalls/request'

class LoginForm extends Component {

    handleSubmit(user) {
        this.props.userActions.loginUser(user);
    }

    render() {
        let { user } = this.props;
        let { userAuth } = this.props.userAuth;

        return (
            <div >
                <Col xs='100%'>
                    <h2 className='login-header'>Login</h2>
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

                            <Button submit className='submit-btn' type="hollow-primary">Submit</Button>
                            <span className='log-err-msg'>{ userAuth }</span>

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
