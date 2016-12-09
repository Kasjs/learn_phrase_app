import React, { Component, Proptypes } from 'react'
import { Router } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import RegisterForm from '../components/RegisterForm'
import * as pageActions from '../actions/pageActions'
import * as userActions from '../actions/userActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../../styles/css/style.lib.css/style.lib.css'
import '../../styles/css/main.css'

class App extends Component {

    render() {
        const { page, userAuth, user, category } = this.props
        return (
            <div className='row'>
                <User
                    {...page}
                    {...userAuth}
                    {...this.props.userActions}
                    clearPageInfo={this.props.pageActions.clearPageInfo}
                    />
    			<Page className='main'
                    {...page}
                    {...userAuth}
                    {...this.props.pageActions}
                    registerNewUser={this.props.userActions.registerNewUser}
                    />
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
		page: state.page,
        userAuth: state.userAuth,
        RegisterForm: state.RegisterForm
	}
}

function mapDispatchToProps(dispatch) {
		return {
			pageActions: bindActionCreators(pageActions, dispatch),
			userActions: bindActionCreators(userActions, dispatch),
            RegisterFormActions: bindActionCreators(userActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
