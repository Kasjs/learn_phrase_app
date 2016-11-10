import { Button, Row, Col, Container, FormSelect, FormField, FormInput } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form';

export default class RegForm extends Component {
    render() {
        return (
            <div >
            <Col xs='100%'>
                <h2 className='login-header'>Login</h2>
            </Col>
            <Row>
                <Col className='req-form-cont' xs='50%'>
                    <Form className='form' model="user" onSubmit={(user) => this.handleSubmit(user)}>
                        <Field className='form-group email-label' model="user.email">
                            <label>Email addres:</label>
                            <input className='form-control' type="email" placeholder='Email' />
                        </Field>

                        <Field className='form-group' model="user.password">
                            <label>Password: </label>
                            <input className='form-control' type="password" placeholder='Password' />
                        </Field>

                        <Button submit className='submit-btn' type="hollow-primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
            </div>
        )
    }
}
