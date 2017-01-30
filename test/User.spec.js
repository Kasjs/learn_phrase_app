'use strict'
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
import User from '../public/app/src/components/User';
import RegButtons from '../public/app/src/components/User';

describe ('<User/>', () => {
    it('should have a class named auth-btn', () => {
        const wrapper = shallow(<User />);
        expect(wrapper.is('.user')).to.equal(true);
    });
    it('should have 0 children', () => {
        const wrapper = shallow(<User />);
        expect(wrapper.children().length).to.equal(0)
    });
    it('should have children with a class named user-email and log-out-btn', () => {
        const wrapper = mount(<RegButtons />);
        expect(wrapper.children().length).to.equal(2);
    });
    it('should don\'t have children with a class named register-btn and login-btn', () => {
        const wrapper = shallow(<User />);
        expect(wrapper.children('.register-btn').length).to.equal(0);
        expect(wrapper.children('.login-btn').length).to.equal(0);
    });
    it('should  have all defined props', () => {
        const wrapper = mount(<User />);
        wrapper.setState({ email : 'test@test.com' });
        expect(wrapper.state('email')).to.equal('test@test.com');
    });
});

describe('User initial states', () => {
    it('should start with initial state', () => {
        const wrapper = mount(<User />);
        expect(wrapper.state('user').email).to.be.defined;
        expect(wrapper.state('user').password).to.equal('');
        expect(wrapper.state('user').status).to.equal(0);
        expect(wrapper.state('user').isAuthButtonsHidden).to.be.defined;
        expect(wrapper.state('user').clientMsg).to.equal('');
        expect(wrapper.state('user').serverMsg).to.equal('');
    });
    it('should have the methods', () => {
        const wrapper = mount(<User />);
        expect(wrapper.instance().logoutAndClearPageInfo).to.be.defined;
    });
});
