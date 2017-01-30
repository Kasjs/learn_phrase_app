import React, { PropTypes, Component } from 'react'
import { hideOrShow } from '../Page'

export default function OfflineRow(props) {
    return (
        <section className={ props.isOffline ? 'row offline-row hide' : 'row offline-row' }>
            <div className={ hideOrShow(['col-xs-6']) }>
                <span> Go Offline </span>
                <button onClick={ props.preparingToOffline } className='offline-btn btn'>
                    <i aria-hidden='true' className="fa fa-toggle-on fa-1x"></i>
                </button>
            </div>
        </section>
    )
}
