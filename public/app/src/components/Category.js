import { Button, Row, Col, Container, FormSelect, FormField, FormInput } from 'elemental'
import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'
import * as pageActions from '../actions/pageActions'
import { connect } from 'react-redux'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { browserHistory, hashHistory } from 'react-router'
import { updateCategory } from '../ajaxCalls/request'

class Category extends Component {

    handleCreate(category) {
        let newCategory = {
            value: category.name,
            label: category.name
        };
        let categoryContent = {
            hits: 0,
            side_a: category.side_a,
            side_b: category.side_b
        };
        if (category.name && category.side_a && category.side_b ) {
            updateCategory(newCategory, categoryContent);
            this.props.pageActions.updateCategoryContent();
            hashHistory.push('/');
        } else {
            this.props.userActions.showCategoryMassage();
        }
    }

    render() {

        let { category } = this.props;
        let { msgCategory } = this.props.userAuth;
        console.log(this.props);

        return (
            <div>
                <Col xs='100%'>
                    <h2 className='login-header'>Add New Category</h2>
                </Col>
                <Row>
                    <Col className='req-form-cont' xs='50%'>
                        <Form className='form' model="category" onSubmit={(category) => this.handleCreate(category)}>
                            <Field className='form-group email-label' model="category.name">
                                <label>Category Name</label>
                                <input className='form-control' type="text" placeholder='Category Name' />
                            </Field>
                            <Field className='form-group' model="category.side_a">
                                <label>Side A Value</label>
                                <input className='form-control' type="text" placeholder='side_a value' />
                            </Field>
                            <Field className='form-group' model="category.side_b">
                                <label>Side B Value(translated)</label>
                                <input className='form-control' type="text" placeholder='side_b value' />
                            </Field>
                            <Field className='form-group' model="category.example">
                                <label>Example of Content</label>
                                <textarea rows='2' cols='5' maxLength='80' disabled className='form-control' type="text"
                                    placeholder=' side_a: sky,
                                                  side_b: небо'
                                ></textarea>
                            </Field>
                            <Button submit className='submit-btn' type="hollow-primary">Create
                            </Button>
                            <span className='msg-category'>{ msgCategory }</span>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

Category.propTypes = {
    category : React.PropTypes.object
}

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth,
        page: state.page
    }
}

function mapDispatchToProps(dispatch) {
		return {
			userActions: bindActionCreators(userActions, dispatch),
            pageActions: bindActionCreators(pageActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);