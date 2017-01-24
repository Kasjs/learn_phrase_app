import React, { PropTypes, Component } from 'react'

export default function OnlineRow(props) {
    return (
        <section className={ props.isOffline ? 'row online-row' : 'row online-row hide' }>
            <div className='col-xs-12'>
                <span> Go OnLine </span>
                <button onClick={ props.preparingToOffline } className='online-btn btn'>
                    <i className="fa fa-toggle-off"></i>
                </button><span className='ready-msg'> Now you can go offline</span>
            </div>
        </section>
    )
}
