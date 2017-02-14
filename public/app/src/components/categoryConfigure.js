'use scrict'

import React, { PropTypes, Component } from 'react'
import FormSelect from 'elemental/lib/components/FormSelect'
import { Field, Form, actions, Errors, modelReducer } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import * as configureActions from '../actions/configureActions'
import { deleteItemInSelectedCategory, addLeftedItem } from '../actions/configureActions'
import { connect } from 'react-redux'
import { getCategoryField, getCategoryOptions, setCategoryOptions, removeCategoryField,
    setCategoryField, getIsOfflineField, setSelectedCategory } from '../localStorage/localStorageMethods'
import { login, getCategoryFromServer, getAllCategory, syncAllCategoryAndContent, changeCategoryName  } from '../ajaxCalls/request'
import hashHistory from 'react-router/lib/hashHistory'
import { initialState } from '../reducers/configure'
import validator from 'validator'

// working function
function fadeOn(className) {
    let componentClass = ['row', 'config-form'];
    if (className) {
        componentClass.push(className);
    } else {
        return componentClass.join(' ');
    }
    return componentClass.join(' ');
}

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
    location.reload();
    if (!isOffline) {
        syncAllCategoryAndContent();
    }
}

// class component
class categoryConfigure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: initialState
        }
    }

    render() {

        let that = this;
        let { selectedCategory, itemsInCategory, isClicked, showSpinner, hide, isEmpty } = this.props.category;
        let { deleteSelectedCategory, deleteItemInSelectedCategory,
            getSelectedCategoryForChange, FadeOn, fadeOff, changeButtonState, hideForm } = this.props.configureActions;
        let isOffline = localStorage.getItem('isOffline');

        function updateName(name) {
            if (name.updated) {
                let categoryOptions = JSON.parse(getCategoryOptions());
                let categoryField = getCategoryField(selectedCategory);
                Promise.resolve(categoryOptions).then(function(categoryOptions){
                    categoryOptions.map((item) => {
                        if (item.label === selectedCategory) {
                            item.label = name.updated;
                            item.value = name.updated;
                        }
                    });
                    setCategoryOptions(categoryOptions);
                    changeCategoryName(selectedCategory, name.updated, categoryField);
                    location.reload();
                });
            }
            return;
        }

        function UpdateButton(props) {
            return (
                <button  onClick={ changeButtonState }
                    className={ selectedCategory ? 'update-btn btn-primary' : 'update-btn btn-primary hide' }>Change Name
                </button>
            );
        }

        function InputForName(props) {
            return (
                <Form className='change-name-form' model='category' onSubmit={ (name) => updateName(name) }>
                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 change-name-container'>
                        <Field model='category.updated'
                            validators={{ isRequired: (val) => val && val.length }}>
                            <input className='input-name form-control' type="text" placeholder={ selectedCategory } />
                            <Errors wrapper="span" show={{ touched: true, focus: false }}
                                model='category.updated'
                                messages={{
                                    isRequired: 'Category name can\'t be empty'
                                }}/>
                        </Field>
                    </div>
                    <div className='col-xs-6 first-btn-container'>
                        <button type='submit' className='btn-change'>Change name</button>
                    </div>
                    <div className='col-xs-12 hide-btn-container'>
                        <button  onClick={ hideForm } className='btn hide-btn'>Hide Field</button>
                    </div>
                </Form>
            )
        }

        function UpdateField(props) {
            const isButtonClicked = props.isClicked;
            if (isButtonClicked) {
                return <InputForName/>;
            }
            return <UpdateButton />;
        }

        function loadCategory(val) {
            if(val !== '') {
                this.props.configureActions.fadeOn();
                setTimeout(function() { fadeOff(); }, 500);
            }
            let options = setOptions();
            let listsOfCategoryItems = [];
            options.forEach(function(item) {
                if (item.label === val) {
                    if (!isOffline) {
                        getAllCategory();
                    }
                    getSelectedCategoryForChange(item.label, getCategoryField(item.label));
                }
            })
        }

        function computationCategory (props) {
            let isChecked = props.isChecked;
            let itemsOfCategory = that.props.category.itemsInCategory;
            isChecked = !isChecked;
            var newCategoryName = itemsOfCategory.map((item, index) => {
                if (isChecked) {
                    if (item.side_b === props.value) {
                        that.props.category.itemsInCategory.splice(index, 1);
                        deleteItemInSelectedCategory(that.props.category.itemsInCategory);
                        setCategoryField(props.category, that.props.category.itemsInCategory);
                        that.props.configureActions.fadeOn();
                        setTimeout(function() { fadeOff(); }, 500);
                    }
                }
            });
            if (!isOffline) {
                syncAllCategoryAndContent();
            }
        }

        function ListContainer(props) {
            return (
                <li className='list-item' key={ props.value }>{ props.value }
                    <input className='input-item' type='checkbox'
                    onChange={ () => { computationCategory(props) } }/>
                </li>
            );
        }

        function ListItems(props) {
            var category = props.category;
            let items = props.lists;
            if( items ) {
                var listItems = items.map((item) =>
                    <ListContainer category={ category } isChecked={ false } key={ item.side_b } value={ item.side_b } />
                );
                return (<ul className='list-element'>{ listItems }</ul>);
            }
        }

        return (
            <div>
                <div className='spinner-container'>
                    <i className={ showSpinner ? 'fa fa-spinner fa-pulse fa-5x fa-fw' : 'fa fa-spinner fa-pulse fa-3x fa-fw hide' }></i>
                </div>
                <section className={ fadeOn(hide) }>
                    <div className='col-xs-12'>
                        <button className='bnt btn-link back-link-btn' onClick={() => hashHistory.push('/')}>
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i> Back
                        </button>
                    </div>
                    <header className='col-xs-12'>
                        <h2 className='configure-header'> Category Configuration</h2>
                    </header>
                    <section className='panel panel-default col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
                        <Form action='' className='form' model="category">
                            <FormSelect className='configure-select' options={ setOptions() } firstOption='Select...'
                                onChange={ loadCategory.bind(this) }
                            />
                        </Form>
                        <span className='category-name-text'> Category name: </span>
                        <span className={ selectedCategory ? 'configure-category' : 'configure-category hide'}>{ selectedCategory }</span>
                        <button onClick={ () => deleteSelectedCategory(selectedCategory) } className='del-category-btn btn'>
                            <i className={ selectedCategory ? 'fa fa-trash' : 'fa fa-trash hide' } aria-hidden="true"></i>
                        </button>
                        <UpdateField isClicked={ isClicked } />
                        <h5 className='select-to-del'>Select item to delete:</h5>
                        <ListItems lists={ itemsInCategory } category={ selectedCategory } />
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
			configureActions: bindActionCreators(configureActions,  dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryConfigure);
