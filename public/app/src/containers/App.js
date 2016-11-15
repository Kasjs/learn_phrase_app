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
        const { registerNewUser } = this.props.userActions
		return (
            <div className='row'>
    			<Page className='main'
                    page={page.page}
    				phrase={page.phrase}
                    counter={page.counter}
                    hits={page.hits}
    				getNextPhrase={getNextPhrase}
    				getRandomPhrase={getRandomPhrase}
    				getBackPhrase={getBackPhrase}
    				switchLanguage={switchLanguage}
    				getPhrase={getPhrase}
                    getSelectedCategory={getSelectedCategory}
                    syncCatAndRating={syncCatAndRating}/>
                <User
                    email={userAuth.email}
                    hidden={userAuth.hidden}
                    isAuth={userAuth.isAuth}
                    registerNewUser={registerNewUser} />
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
