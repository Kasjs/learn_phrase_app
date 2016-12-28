'use scrict'
import Button from 'react-bootstrap/lib/Button'
import React, { PropTypes, Component } from 'react'
import FormSelect from 'elemental/lib/components/FormSelect'
import { Field, Form, actions } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as configureActions from '../actions/configure'
import { connect } from 'react-redux'
import { getCategoryField, getCategoryOptions, setCategoryOptions, removeCategoryField, setCategoryField } from '../localStorage/localStorageMethods'
import { login, getCategoryFromServer, getAllCategory, syncAllCategoryAndContent  } from '../ajaxCalls/request'
import { initialState } from '../reducers/configure'

function setOptions() {
    var optionsFromStorage;
    optionsFromStorage = JSON.parse(localStorage.getItem('options'));
    return optionsFromStorage;
}

function setDataOfCategory(category) {
    var items = getCategoryField(category);
    let lists = [];
    items.map(function(item) {
        lists.push(
            <li className='list-element' key={item.side_b}>{item.side_b}
                <button onClick={() => deleteItem(category, item.side_b)} className='del-category-btn btn'>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </li>
        );
    });
    return lists;
}

function deleteItem(category, item) {
    let itemsOfCategory = getCategoryField(category);
    console.log(itemsOfCategory);
    itemsOfCategory.map(function(element, index) {
        if ( element.side_b === item) {
            console.log(element.side_b, item);
            itemsOfCategory.splice(index, 1);
        }
    });
    console.log(itemsOfCategory);
    setCategoryField(category, itemsOfCategory);
    syncAllCategoryAndContent();
}

export function deleteCategory(category) {
    let options = JSON.parse(getCategoryOptions());
    options.map(function(item, index) {
        if (item.label === category) {
            options.splice(index, 1);
            removeCategoryField(item.label);
        }
    });
    setCategoryOptions(options);
    syncAllCategoryAndContent();
}

class categoryConfigure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: initialState
        }
    }
    loadCategory(val) {
        let that = this.props;
        let options = setOptions();
        options.forEach(function(item) {
            if(item.label === val) {
                getAllCategory();
                let listsOfCategoryItems = setDataOfCategory(item.label);
                that.configureActions.getSelectedCategoryForChange(item.label, listsOfCategoryItems);
            }
        })
    }

    render() {
        let { selectedCategory, itemsInCategory } = this.props.cat;
        let { deleteSelectedCategory } = this.props.configureActions;
        return (
            <div>
                <div className='row config-form'>
                    <div className='col-xs-12'>
                        <h2 className='configure-header'>Category configuration</h2>
                    </div>
                    <div className='col-xs-offset-1 col-xs-10'>
                        <Form className='form' model="category">
                            <FormSelect className='configure-select' options={setOptions()}
                                onChange={this.loadCategory.bind(this)}
                            />
                        </Form>
                        <span className='category-name-text'>Category name: </span>
                        <span className={ selectedCategory ? 'configure-category' : 'configure-category hide'}>{ selectedCategory }</span>
                        <button onClick={() => deleteSelectedCategory(selectedCategory)} className='del-category-btn btn'>
                            <i className={ selectedCategory ? 'fa fa-times' : 'fa fa-times hide' } aria-hidden="true"></i>
                        </button>
                        <br/>
                        <span className='items-list-text'>Items of category:<span className='items'>{ itemsInCategory }</span></span>
                    </div>
                </div>
            </div>
        )
    }
}

categoryConfigure.propTypes = {
    user : React.PropTypes.string,
    clientMsg: React.PropTypes.string,
    serverMsg: React.PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        cat: state.configure
    }
}

const mapDispatchToProps = (dispatch) => {
		return {
			configureActions: bindActionCreators(configureActions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryConfigure);
