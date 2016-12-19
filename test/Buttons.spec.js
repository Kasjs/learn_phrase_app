'use strict'
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon, { spy } from 'sinon';
import { Button } from 'react-bootstrap'
import { page } from '../public/app/src/reducers/page'

chai.use(chaiEnzyme())
import  Buttons_Row  from '../public/app/src/components/sub-components/Buttons_Row';

describe('<Buttons_Row />', () => {
    it('should have 4 buttons', () => {
        const wrapper = mount(<Buttons_Row />);
        expect(wrapper.find(Button).length).to.equal(4);
    });
    it('should response on click event', () => {
        const wrapper = shallow(<Buttons_Row />);
        expect(wrapper.type()).to.equal('div');
    });
});
