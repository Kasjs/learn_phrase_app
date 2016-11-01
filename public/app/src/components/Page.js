import { Button, Row, Col, Container } from 'elemental'
import React, { PropTypes, Component } from 'react'

export default class Page extends Component {
  onGetNextPhraseBtnClick() {
    this.props.getNextPhrase();
  }
  onGetRandomPhraseBtnClick() {
    this.props.getRandomPhrase();
  }
  render() {
    const { page, phrase } = this.props
    return <div>
      <p><strong className='lead'>{phrase}</strong> </p>
      <hr/>
      <Row className='btns-row'>
        <Col xs="100%" sm="100%" md="70%" lg="50%">
          <Button className='buttons' size='lg' type='success' onClick={this.onGetNextPhraseBtnClick.bind(this)}>Next</Button>
          <Button className='buttons' size='lg'  type='primary'>Eng</Button>
          <Button className='buttons' size='lg'  type='warning'>Translate</Button>
          <Button className='buttons' size='lg'  type='danger'>Random</Button>
        </Col>
      </Row>
    </div>
  }
}

Page.propTypes = {
  page: PropTypes.string.isRequired,
  phrase: PropTypes.string.isRequired
}
