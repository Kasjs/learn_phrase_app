'use strict'
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon, { spy } from 'sinon';
import { Field, Form, actions } from 'react-redux-form';
import { initialState } from '../public/app/src/reducers/userAuth';


chai.use(chaiEnzyme())
import  LoginForm  from '../public/app/src/components/LoginForm';
describe('<LoginForm />', () => {
    it('shoul work', () => {

    });
});
