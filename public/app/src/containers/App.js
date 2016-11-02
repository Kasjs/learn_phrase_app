import React, {Component, Proptypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../../styles/css/style.lib.css/style.lib.css'
import '../../styles/css/main.css'

class App extends Component {
  render() {
    const {user, page} = this.props
    const { getNextPhrase, getRandomPhrase, getBackPhrase, switchLanguage, getPhrase } = this.props.pageActions
    return <div>
      <User name={user.name}/>
      <Page className='main' page={page.page}
        phrase={page.phrase} counter={page.counter}
        getNextPhrase={getNextPhrase}
        getRandomPhrase={getRandomPhrase}
        getBackPhrase={getBackPhrase}
        switchLanguage={switchLanguage}
        getPhrase={getPhrase}
      />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    page: state.page,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
    return {
      pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
