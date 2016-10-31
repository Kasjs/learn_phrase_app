import React, {Component, Proptypes} from 'react'
import {connect} from 'react-redux'

class App extends Component {
  render() {
    const {user, page} = this.props
    return <div>
      <p>Hi from {user.name}</p>
      <p>You are on {page.page} page</p>
    </div>
  }
}

function mapStateToProps(state){
  return {
    page: state.page,
    user: state.user
  }
}
export default connect(mapStateToProps)(App)
