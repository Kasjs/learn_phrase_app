import React, { PropTypes, Component } from 'react'
import { hideOrShow } from '../Page'
import ReactTouchEvents from "react-touch-events";
import * as pageActions from '../../actions/pageActions';
import Buttons_Row from './Buttons_Row'
import { getBackPhrase, getNextPhrase, switchLanguage } from '../../actions/pageActions'


export default function PhraseRow(props) {

    function handleTap () {
        props.switchLanguage();
        props.getPhrase();
    }

    function handleSwipe (direction) {
        switch (direction) {
            case "left":
                props.getBackPhrase();
                break;
            case "right":
                props.getNextPhrase();
                break;
            default:
        }
    }

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
                <ReactTouchEvents
                    onTap={ handleTap.bind(this) }
                    onSwipe={ handleSwipe.bind(this) }>
                    <span className='phrase col-xs-12'>{ props.phrase }</span>
                </ReactTouchEvents>
            </div>
        </section>
    )
}
