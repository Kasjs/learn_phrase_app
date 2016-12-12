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
                <div className='row req-form-cont'>
                    <div className='col-xs-12'>
                        <h2 className='login-header'>Login</h2>
                    </div>
                    <div className='col-xs-offset-1 col-xs-10'>
                        <Form className='form' model="user" onSubmit={(user) => this.handleSubmit(user)}>
                            <Field className='form-group email-label' model="user.email">
                                <input className='form-control' type="email" placeholder='Email' />
                            </Field>
                            <Field className='form-group' model="user.password">
                                <input className='form-control' type="password" placeholder='Password' />
                            </Field>
                            <Button submit className='submit-btn col-xs-12' type="hollow-primary">Submit</Button>
                            <span className='msg-client-error'>{ clientMsg }</span>
                            <span className='msg-server-error'>{ serverMsg }</span>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

LoginForm.propTypes = {
    user : React.PropTypes.string

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
