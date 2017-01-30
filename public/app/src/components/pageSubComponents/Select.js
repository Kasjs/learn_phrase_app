import React, { PropTypes, Component } from 'react'
import FormSelect from 'elemental/lib/components/FormSelect'
import { hideOrShow, setOptions } from '../Page'
import hashHistory from 'react-router/lib/hashHistory'
import { getAllCategory } from '../../ajaxCalls/request'

export default function Select(props) {
    const componentClass = ['select-comp', 'row'];
    return (
        <section className={ hideOrShow(componentClass) }>
            <div className='select-options col-xs-6 col-sm-4 col-md-3 col-lg-2'>
                <FormSelect className='select-category' options={ setOptions() } firstOption='Select...'
                    onChange={ props.selectCategory }
                />
            </div>
            <div className='col-xs-4 btn-sunc-col'>
                <button className='btn-sunc btn'
                    onClick={ props.addCategory }>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
                <button className='btn-configure btn' onClick={ () => { getAllCategory(); hashHistory.push('configure') } }>
                    <span className="fa fa-wrench configure "></span>
                </button>
            </div>
        </section>
    )
}
