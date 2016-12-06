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
		const { getNextPhrase, getRandomPhrase, getBackPhrase, switchLanguage,
            getPhrase, getSelectedCategory, syncCatAndRating, clearPageInfo, logChange,
            updateCategoryContent, preparingToOffline, switchOfflineOnLineMode } = this.props.pageActions
        const { registerNewUser, logOutUser, loginUser, showMassage, showCategoryMassage } = this.props.userActions
		return (
            <div className='row'>
                <User
                    email={userAuth.email}
                    isAuthButtonsHidden={userAuth.isAuthButtonsHidden}
                    status={userAuth.status}
                    msgCategory={userAuth.msgCategory}
                    msgEmail={userAuth.msgEmail}
                    msgPassword={userAuth.msgPassword}
                    showCategoryMassage={showCategoryMassage}
                    phrase={page.phrase}
                    counter={page.counter}
                    showMassage={showMassage}
                    clearPageInfo={this.props.pageActions.clearPageInfo}
                    hits={page.hits}
                    registerNewUser={registerNewUser}
                    logOutUser={logOutUser}
                    loginUser={loginUser}
                    />
    			<Page className='main'
                    page={page.page}
                    isOffline={page.isOffline}
                    email={userAuth.email}
                    isAuthButtonsHidden={userAuth.isAuthButtonsHidden}
    				phrase={page.phrase}
                    counter={page.counter}
                    hits={page.hits}
                    registerNewUser={this.props.userActions.registerNewUser}
                    preparingToOffline={preparingToOffline}
    				getNextPhrase={getNextPhrase}
    				getRandomPhrase={getRandomPhrase}
    				getBackPhrase={getBackPhrase}
                    updateCategoryContent={updateCategoryContent}
    				switchLanguage={switchLanguage}
                    switchOfflineOnLineMode={switchOfflineOnLineMode}
                    logChange={logChange}
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
