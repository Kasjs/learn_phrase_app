import { Button, Row, Col, Container, FormSelect, FormField, FormInput } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'
import { Link, browserHistory, hashHistory } from 'react-router'
import { register, transferMessages } from '../ajaxCalls/request'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg,
    getEmailErrorMsg, getPasswordErrorMsg } from '../localStorage/localStorageMethods'

class RegisterForm extends Component {

    handleSubmit(user) {
        if ( user.email && user.password && user.repPassword ) {
            this.props.userActions.registerNewUser(user);
        } else {
            this.props.userActions.showEmailMassage();
        }
    }

    render() {

        let { user } = this.props;
        let { msgEmail, msgPassword } = this.props.userAuth;

        return (
            <div>
                <div className='row req-form-cont'>
                    <div className='col-xs-12'>
                        <h2 className='login-header'>Register</h2>
                    </div>

                    <div className='col-xs-offset-1 col-xs-10'>
                        <Form className='form' model="user" onSubmit={(user) => this.handleSubmit(user)}>
                            <Field className='form-group email-label' model="user.email">
                                <input className='form-control register-input' type="email" placeholder='Email' />
                            </Field>

                            <Field className='form-group' model="user.password">
                                <input className='form-control register-input' type="password" placeholder='Password' />
                            </Field>

                            <Field className='form-group' model="user.repPassword">
                                <input className='form-control register-input' type="password" placeholder='Repeat Password' />
                            </Field>

                            <Button submit className='submit-btn col-xs-12' type="hollow-primary">Submit</Button>
                            <span className='msg-email-error'>{ msgEmail }</span>
                            <span className='msg-password-error'>{ msgPassword }</span>
                        </Form>
                    </div>
                </div>

            </div>
        )
    }
}

RegisterForm.propTypes = {
    user : React.PropTypes.object,
    msgEmail : React.PropTypes.string,
    msgPassword : React.PropTypes.string
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
