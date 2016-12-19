'use strict'
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon, { spy } from 'sinon';

chai.use(chaiEnzyme())
import  LoginForm  from '../public/app/src/components/LoginForm';

describe('<LoginForm />', () => {
    it('shoul have 5 children', () => {
        const wrapper = shallow(<LoginForm />);
        expect(wrapper.children().length).to.equal(5);
    });
});
