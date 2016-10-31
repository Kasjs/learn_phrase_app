import React, {Component, PropTypes} from 'react'

export default class Page extends Component {
  render() {
    const page = this.props
    return <div>You are on {page} page</div>
  }
}
User.propTypes = {
  page: PropTypes.string.isRequired
}
