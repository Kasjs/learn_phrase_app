import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import userReducer from '../public/app/src/reducers/userAuth';

describe('page reducers', () => {
    it('should return the initial state', () =>{
        expect(userReducer({
            email: '',
            password: '',
            status: 0,
            isAuthButtonsHidden: '',
            clientMsg: '',
            serverMsg: '',
            msgCategory: ''
        },{})).to.eql(
            {
                email: '',
                password: '',
                status: 0,
                isAuthButtonsHidden: '',
                clientMsg: '',
                serverMsg: '',
                msgCategory: ''
            }
        );
    });
    it('should return register state', () => {
        expect(userReducer({},{type: 'POST_NEW_USER'})).to.eql({
            "serverMsg": undefined
        });
    });
    it('should return login state', () => {
        expect(userReducer({}, { type: 'LOGIN_USER' })).to.eql({
            email: undefined,
            isAuthButtonsHidden: '{}',
            status: 200
        });
        expect(userReducer({}, { type: 'LOGIN_USER', status: 400 })).to.eql({
            email: '',
            isAuthButtonsHidden: false,
            status: 400
        });
        expect(userReducer({}, { type: 'LOGIN_USER', status: 200 })).to.eql({
            email: undefined,
            isAuthButtonsHidden: "{}",
            status: 200
        });
    });
    it('should clear page info and logout', () => {
        expect(userReducer({},{type: 'CLEAR_PAGE_INFO_AND_LOGOUT'})).to.eql({
            "email": undefined,
            "isAuthButtonsHidden": undefined
        });
    });
    it('should show error msg', () => {
        expect(userReducer({},{type: 'SHOW_ERROR_MESSAGE'})).to.eql({
            "clientMsg": undefined
        });
    });
    it('should clear error msg', () => {
        expect(userReducer({},{type: 'CLEAR_ERROR_MESSAGE'})).to.eql({
            "clientMsg": "",
            "serverMsg": "",
            "msgCategory": ""
        });
    });

});
