import React, { PropTypes, Component } from 'react'
import { hideOrShow } from '../Page'
import { setSelectedOptions } from '../Page'

export default function SelectedRow(props) {
    const componentClass = ['select-row', 'row'];
    return (
        <section className={ hideOrShow(componentClass) }>
            <div className='col-xs-6'>
                <span className='selected-category'> Now selected: <strong>{ setSelectedOptions() }</strong></span>
            </div>
        </section>
    )
}
