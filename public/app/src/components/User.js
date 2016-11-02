import React, { PropTypes, Component } from 'react'
import { FormSelect, Col, Row } from  'elemental'

export default class User extends Component {
  onChangeCategory() {
    this.props.changeCategory();
  }

  render() {
    const { name } = this.props
    return <div>
      <Row className='select-comp'>
        <Col xs="65%" sm="40%" md="25%" lg="20%">
          <FormSelect className='select-category' options={[
            {value : 'Food', label: 'Food'},
            {value : 'Sport', label: 'Sport'},
            {value : 'Nature', label: 'Nature'},
            {value : 'IT', label: 'IT'}
          ]} firstOption='Select Category' />
        </Col>
      </Row>
    </div>
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired
}
