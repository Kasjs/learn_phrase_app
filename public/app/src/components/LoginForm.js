'use scrict'

import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'
import { connect } from 'react-redux'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { login } from '../ajaxCalls/request'
import { initialState } from '../reducers/userAuth'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAuth: initialState
        }
    }

    handleSubmit(user) {
        if (user.email && user.password) {
            this.props.userActions.loginUser(user);
        } else {
            this.props.userActions.showErrorMsg();
        }
    }

    render() {

        let { user } = this.props;
        let { clientMsg, serverMsg } = this.props.userAuth;

        return (
            <div >
                <section className='row req-form-cont'>
                    <header className='col-xs-12'>
                        <h2 className='login-header'>Login</h2>
                    </header>
                    <section className='col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
                        <Form className='form' model="user" onSubmit={(user) => this.handleSubmit(user)}>
                            <Field className='form-group email-label' model="user.email">
                                <input className='form-control' type="email" placeholder='Email' />
                            </Field>
                            <Field className='form-group' model="user.password">
                                <input className='form-control' type="password" placeholder='Password' />
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

LoginForm.propTypes = {
    user : React.PropTypes.string,
    clientMsg: React.PropTypes.string,
    serverMsg: React.PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        userAuth: state.userAuth
    }
}

const mapDispatchToProps = (dispatch) => {
		return {
			userActions: bindActionCreators(userActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
