'use scrict'

import React, { PropTypes, Component } from 'react'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'
import * as pageActions from '../actions/pageActions'
import { connect } from 'react-redux'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg,
    getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import hashHistory from 'react-router/lib/hashHistory'
import { updateCategory } from '../ajaxCalls/request'

class Category extends Component {
    constructor(props) {
        super(props);
    }

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

        return (
            <div>
                <section className='row category-form'>
                    <header className='col-xs-12'>
                        <h2 className='category-header'> Add New Category</h2>
                    </header>
                    <section className='col-xs-10 col-xs-offset-1' >
                        <Form className='form' model="category" onSubmit={(category) => this.handleCreate(category)}>
                            <Field className='form-group email-label' model="category.name">
                                <input className='form-control' type="text" placeholder='Category Name' />
                            </Field>
                            <Field className='form-group' model="category.side_a">
                                <input className='form-control' type="text" placeholder='side_a value (native language)' />
                            </Field>
                            <Field className='form-group' model="category.side_b">
                                <input className='form-control' type="text" placeholder='side_b value (foreign language)' />
                            </Field>
                            <Field className='form-group' model="category.example">
                                <label className='example-label'> Example of Content</label>
                                <textarea rows='2' cols='5' maxLength='80' disabled className='form-control' type="text"
                                    placeholder=' side_a: небо,
                                                  side_b: sky'
                                ></textarea>
                            </Field>
                            <button type='submit' className='submit-btn btn col-xs-12'> Create</button>
                            <span className='msg-category'>{ msgCategory }</span>
                        </Form>
                    </section>
                </section>

            </div>
        )
    }
}

Category.propTypes = {
    category : React.PropTypes.object,
    msgCategory: React.PropTypes.string
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
