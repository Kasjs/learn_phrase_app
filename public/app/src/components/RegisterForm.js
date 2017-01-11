'use scrict'

import React, { PropTypes, Component } from 'react'
import Field  from 'react-redux-form/lib/components/field-component'
import Form  from 'react-redux-form/lib/components/form-component'
import actions  from 'react-redux-form/lib/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'
import { register, transferMessages } from '../ajaxCalls/request'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg,
    getEmailErrorMsg, getPasswordErrorMsg } from '../localStorage/localStorageMethods'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(user) {
        if ( user.email && user.password && user.repPassword && user.secretWord ) {
            this.props.userActions.registerNewUser(user);
            this.props.userActions.clearErrorMsg();
        } else {
            this.props.userActions.showErrorMsg();
        }
    }

    render() {

        let { user } = this.props;
        let { clientMsg, serverMsg } = this.props.userAuth;

        return (
            <div>
                <section className='row req-form-cont'>
                    <header className='col-xs-12'>
                        <h2 className='login-header'>Register</h2>
                    </header>
                    <section className='col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
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
                            <Field className='form-group' model="user.secretWord">
                                <input className='form-control register-input' type="password" placeholder='Secret Word' />
                            </Field>
                            <button type='submit' className='submit-btn btn col-xs-12'>Submit</button>
                            <span className='msg-client-error'>{ clientMsg }</span>
                            <span className='msg-server-error'>{ serverMsg }</span>
                        </Form>
                    </section>
                </section>
            </div>
        )
    }
}

RegisterForm.propTypes = {
    user : React.PropTypes.object,
    clientMsg : React.PropTypes.string,
    serverMsg : React.PropTypes.string
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
