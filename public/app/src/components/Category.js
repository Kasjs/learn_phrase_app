import { Button, Row, Col, Container, FormSelect, FormField, FormInput } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'
import { connect } from 'react-redux'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'


class Category extends Component {

    handleCreate(category) {
        
    }

    render() {

        let { category } = this.props;

        return (
            <div >
                <Col xs='100%'>
                    <h2 className='login-header'>Add New Category</h2>
                </Col>
                <Row>
                    <Col className='req-form-cont' xs='50%'>
                        <Form className='form' model="user" onSubmit={(category) => this.handleCreate(category)}>
                            <Field className='form-group email-label' model="category.name">
                                <label>Category Name</label>
                                <input className='form-control' type="text" placeholder='Category Name' />
                            </Field>

                            <Field className='form-group' model="category.content">
                                <label>Category Content</label>
                                <textarea className='form-control' type="text" placeholder='Category Content' />
                            </Field>

                            <Field className='form-group' model="category.example">
                                <label>Example of Content</label>
                                <textarea rows='4' cols='5' maxlength='80' disabled className='form-control' type="text"
                                    placeholder=' side_a: sky,
                                                    side_b: небо'
                                ></textarea>
                            </Field>

                            <Button submit className='submit-btn' type="hollow-primary">Create</Button>

                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth
    }
}

function mapDispatchToProps(dispatch) {
		return {
			userActions: bindActionCreators(userActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
