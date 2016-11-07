import React, {Component, Proptypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import * as pageActions from '../actions/pageActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../../styles/css/style.lib.css/style.lib.css'
import '../../styles/css/main.css'

class App extends Component {
	render() {
		const { page } = this.props
		const { getNextPhrase, getRandomPhrase, getBackPhrase, switchLanguage,
            getPhrase, getSelectedCategory, syncCatAndRating } = this.props.pageActions
		return <div>
			<Page className='main' page={page.page}
				phrase={page.phrase}
                counter={page.counter}
                rating={page.rating}
				getNextPhrase={getNextPhrase}
				getRandomPhrase={getRandomPhrase}
				getBackPhrase={getBackPhrase}
				switchLanguage={switchLanguage}
				getPhrase={getPhrase}
                getSelectedCategory={getSelectedCategory}
                syncCatAndRating={syncCatAndRating}
			/>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		page: state.page,
	}
}

function mapDispatchToProps(dispatch) {
		return {
			pageActions: bindActionCreators(pageActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
