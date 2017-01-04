'use strict'
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon, { spy } from 'sinon';
import { Button } from 'react-bootstrap'
import { page } from '../public/app/src/reducers/page'

chai.use(chaiEnzyme())
import  Page  from '../public/app/src/components/Page';

describe ('<Page/>', () => {
    it('should have a class named phrase-row', () => {
        const wrapper = shallow(<Page />);
        expect(wrapper.is('.phrase-row')).to.equal(true);
    });
    it('should have 7 children', () => {
        const wrapper = shallow(<Page />);
        expect(wrapper.children().length).to.equal(7)
    })
    it('should have children with a class named header', () => {
        const wrapper = shallow(<Page />);
        expect(wrapper.children('.header').length).to.equal(1);
        expect(wrapper.children('.select-comp').length).to.equal(1);
    });
    it('should have this.props with an hits value', () => {
        const wrapper = shallow(<Page />);
        wrapper.setState({ 'hits': 0 });
        expect(wrapper.state('hits')).to.equal(0);
        wrapper.setState({ 'hits': 1 });
        expect(wrapper.state('hits')).to.equal(1);
    });
    it('should have this.props with an position value', () => {
        const wrapper = shallow(<Page />);
        wrapper.setState({ 'position': 0 });
        expect(wrapper.state('position')).to.equal(0);
        wrapper.setState({ 'position': 1 });
        expect(wrapper.state('position')).to.equal(1);
        wrapper.setState({ 'position': 2 });
        expect(wrapper.state('position')).to.equal(2);
    });
    it('should start with initial state', () => {
        const wrapper = shallow(<Page />);
        expect(wrapper.state('page').hits).to.equal(0);
        expect(wrapper.state('page').counter).to.equal(0);
        expect(wrapper.state('page').isOffline).to.equal(false);
        expect(wrapper.state('page').side).to.equal('side_a');
        expect(wrapper.state('page').unAuthorizedMsg).to.equal('');
        expect(wrapper.state('page').phrase).to.equal('');
    });
});

describe('buttons row', () => {
    it('should call onSubmit when Add is clicked', () => {
        const addItemSpy = spy();
        const wrapper = shallow(<Page />);

    });
});
