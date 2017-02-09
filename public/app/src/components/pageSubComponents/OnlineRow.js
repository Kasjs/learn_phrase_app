import React, { PropTypes, Component } from 'react'
import { hideOrShow } from '../Page'

export default function OnlineRow(props) {
    return (
        <section className={ props.isOffline ? 'row online-row' : 'row online-row hide' }>
            <div className={ hideOrShow(['col-xs-12']) }>
                <span> Go OnLine </span>
                <button onClick={ props.preparingToOffline } className='online-btn btn'>
                    <i className="fa fa-toggle-off"></i>
                </button><span className='ready-msg'> Now you are in offline</span>
            </div>
        </section>
    )
}
