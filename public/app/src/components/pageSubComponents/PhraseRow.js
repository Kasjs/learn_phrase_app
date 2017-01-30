import React, { PropTypes, Component } from 'react'
import { hideOrShow } from '../Page'

export default function PhraseRow(props) {
    const componentClass = ['phrase-row', 'row'];
    return (
        <section className={ hideOrShow(componentClass) }>
            <div className='col-xs-6 position-col'>
                <span className='position'>
                    Position: <span className='counter'>{ props.counter }</span>
                </span>
            </div>
            <div className='col-xs-6 hits-col'>
                <span className='hits'>
                    Hits: <span className='hits-number'>{ props.hits }</span>
                </span>
            </div>
            <div className='phrase col-xs-12'>
                <span className='phrase col-xs-12'>{ props.phrase }</span>
            </div>
        </section>
    )
}
