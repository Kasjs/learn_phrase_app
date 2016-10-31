import React, {Component, Proptypes} from 'react'
import {connect} from 'react-redux'

class App extends Component {
  render() {
    return <div>Hi from {this.props.page} </div>
  }
}

function mapStateToProps(state){
  return {
    page: state.page
  }
}
export default connect(mapStateToProps)(App)
