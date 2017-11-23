import React from 'react';

import { Hovedknapp as Knapp } from 'nav-frontend-knapper';

import { App } from './App';

describe('a passing test', () => {
    it('shoulder render App with one button', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Knapp)).to.have.length(1);
    });
});