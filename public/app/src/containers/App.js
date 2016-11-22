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
		const { page, userAuth, user } = this.props
		const { getNextPhrase, getRandomPhrase, getBackPhrase, switchLanguage,
            getPhrase, getSelectedCategory, syncCatAndRating } = this.props.pageActions
        const { registerNewUser, logOutUser, loginUser } = this.props.userActions
		return (
            <div className='row'>
                <User
                    email={userAuth.email}
                    isAuthButtonsHidden={userAuth.isAuthButtonsHidden}
                    status={userAuth.status}
                    msg={userAuth.msg}
                    registerNewUser={registerNewUser}
                    logOutUser={logOutUser}
                    loginUser={loginUser}
                    />
    			<Page className='main'
                    page={page.page}
                    email={userAuth.email}
                    isAuthButtonsHidden={userAuth.isAuthButtonsHidden}
    				phrase={page.phrase}
                    counter={page.counter}
                    hits={page.hits}
                    registerNewUser={this.props.userActions.registerNewUser}
    				getNextPhrase={getNextPhrase}
    				getRandomPhrase={getRandomPhrase}
    				getBackPhrase={getBackPhrase}
    				switchLanguage={switchLanguage}
    				getPhrase={getPhrase}
                    getSelectedCategory={getSelectedCategory}
                    syncCatAndRating={syncCatAndRating}/>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
		page: state.page,
        userAuth: state.userAuth
	}
}

function mapDispatchToProps(dispatch) {
		return {
			pageActions: bindActionCreators(pageActions, dispatch),
			userActions: bindActionCreators(userActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
