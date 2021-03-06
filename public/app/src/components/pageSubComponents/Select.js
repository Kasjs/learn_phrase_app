import React, { PropTypes, Component } from 'react'
import FormSelect from 'elemental/lib/components/FormSelect'
import { hideOrShow, setOptions } from '../Page'
import hashHistory from 'react-router/lib/hashHistory'
import { getAllCategory } from '../../ajaxCalls/request'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'

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
            <ButtonGroup className="dropdown">
                <DropdownButton title="" id="nested-dropdown">
                    <MenuItem eventKey="1">
                        <button className='btn-add-drop btn'
                            onClick={ props.addCategory }>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </MenuItem>
                    <MenuItem eventKey="2">
                        <button className='btn-configure-drop btn' onClick={ () => { getAllCategory(); hashHistory.push('configure') } }>
                            <span className="fa fa-wrench configure "></span>
                        </button>
                    </MenuItem>
                </DropdownButton>
            </ButtonGroup>
        </section>
    )
}
