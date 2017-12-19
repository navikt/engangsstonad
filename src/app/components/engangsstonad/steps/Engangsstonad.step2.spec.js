import React from 'react';
import { Step2 } from './Engangsstonad.step2';

describe('<Step2 />', () => {
    it('should not display remaining form if child is born', () => {
        const wrapper = shallow(<Step2 childBorn="true" />);
        expect(wrapper.find('div')).to.have.length(1);
    });

    xit('should display remaining form if child is not born', () => {
        const wrapper = shallow(<Step2 childBorn="false" />);
        wrapper.setState({ childBorn: false });
        expect(wrapper.find('div')).to.have.length(2);
    });
});
