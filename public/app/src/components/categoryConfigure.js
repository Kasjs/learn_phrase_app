'use scrict'

import React, { PropTypes, Component } from 'react'
import FormSelect from 'elemental/lib/components/FormSelect'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as configureActions from '../actions/configure'
import { deleteItemInSelectedCategory } from '../actions/configure'
import { connect } from 'react-redux'
import { getCategoryField, getCategoryOptions, setCategoryOptions, removeCategoryField, setCategoryField, getIsOfflineField } from '../localStorage/localStorageMethods'
import { login, getCategoryFromServer, getAllCategory, syncAllCategoryAndContent  } from '../ajaxCalls/request'
import { initialState } from '../reducers/configure'

function setOptions() {
    let optionsFromStorage;
    optionsFromStorage = JSON.parse(getCategoryOptions());
    return optionsFromStorage;
}

export function deleteCategory(category) {
    let isOffline = getIsOfflineField();
    let options = JSON.parse(getCategoryOptions());
    options.map(function(item, index) {
        if (item.label === category) {
            options.splice(index, 1);
            removeCategoryField(item.label);
        }
    });
    setCategoryOptions(options);
    if (!isOffline) {
        syncAllCategoryAndContent();
    }
}

class categoryConfigure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: initialState
        }
    }

    render() {
        let that = this;
        let { selectedCategory, itemsInCategory } = this.props.category;
        let { deleteSelectedCategory, deleteItemInSelectedCategory, getSelectedCategoryForChange } = this.props.configureActions;
        let isOffline = localStorage.getItem('isOffline');

        let loadCategory = function(val) {
            let options = setOptions();
            options.forEach(function(item) {
                if (item.label === val) {
                    if (!isOffline) {
                        getAllCategory();
                    }
                    let listsOfCategoryItems = setDataOfCategory(item.label);
                    getSelectedCategoryForChange(item.label, listsOfCategoryItems);
                }
            })
        }

        function deleteItem(category, item) {
            let itemsOfCategory = getCategoryField(category);
            itemsOfCategory.map(function(element, index) {
                if ( element.side_b === item) {
                    itemsOfCategory.splice(index, 1);
                    that.props.category.itemsInCategory.map(function(item, index) {
                        if (item.key === element.side_b) {
                            that.props.category.itemsInCategory.splice(index, 1);
                        }
                    });
                }
            });
            setCategoryField(category, itemsOfCategory);
            if (!isOffline) {
                syncAllCategoryAndContent();
            }
            return itemsOfCategory;
        }

        function setDataOfCategory(category) {
            let items = getCategoryField(category);
            let lists = [];
            if (items) {
                items.map(function(item, index) {
                    lists.push(
                        <li className='list-element' key={ item.side_b }>{ item.side_b }
                            <button onClick={ () => deleteItem(category, item.side_b) } className='del-category-btn btn'>
                                <input type='checkbox'/>
                            </button>
                        </li>
                    );
                });
                return lists;
            }
        }

        return (
            <div>
                <section className='row config-form'>
                    <header className='col-xs-12'>
                        <h2 className='configure-header'> Category configuration</h2>
                    </header>
                    <section className='col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
                        <Form action='' className='form' model="category">
                            <FormSelect className='configure-select' options={ setOptions() }
                                onChange={ loadCategory.bind(this) }
                            />
                        </Form>
                        <span className='category-name-text'> Category name: </span>
                        <span className={ selectedCategory ? 'configure-category' : 'configure-category hide'}>{ selectedCategory }</span>
                        <button onClick={ () => deleteSelectedCategory(selectedCategory) } className='del-category-btn btn'>
                            <i className={ selectedCategory ? 'fa fa-times' : 'fa fa-times hide' } aria-hidden="true"></i>
                        </button>
                        <br/>
                        <span className='items-list-text'> Items of category:<ul className='items'>{ itemsInCategory }</ul></span>
                        <button className={ itemsInCategory.length === 0 ? 'hide del-selected-btn btn-danger btn' : 'del-selected-btn btn-danger btn' }
                            onClick= { () => { deleteItemInSelectedCategory(that.props.category.itemsInCategory) }}>
                            <i className="fa fa-trash" aria-hidden="true"></i> Delete
                        </button>
                    </section>
                </section>
            </div>
        )
    }
}

categoryConfigure.propTypes = {
    itemsInCategory : React.PropTypes.array,
    selectedCategory: React.PropTypes.string,
    deleteSelectedCategory: React.PropTypes.func,
    deleteItemInSelectedCategory: React.PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        category: state.configure
    }
}

const mapDispatchToProps = (dispatch) => {
		return {
			configureActions: bindActionCreators(configureActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryConfigure);
