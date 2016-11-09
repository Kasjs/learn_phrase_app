import { Button, Row, Col, Container, FormSelect, Form, FormField, FormInput } from 'elemental'
import React, { PropTypes, Component } from 'react'

export default class RegForm extends Component {
    render() {
        return (
            <div >
                <Col xs='100%'>
                    <h2 className='login-header'>Login</h2>
                </Col>
            <Row>
                <Col className='req-form-cont' xs='50%'>
                    <Form className='reg-form'>
                        <FormField className='email-label' label="Email address" htmlFor="basic-form-input-email">
                        <FormInput autoFocus type="email" placeholder="Enter email" name="form-input-email" />
                        </FormField>
                        <FormField label="Password" htmlFor="basic-form-input-password">
                        <FormInput type="password" placeholder="Password" name="form-input-password" />
                        </FormField>
                        <Button submit type='hollow-primary' className='submit-btn'>Submit</Button>
                    </Form>
                </Col>
            </Row>
            </div>
        )
    }
}
