import * as React from 'react';
import AttachmentButton from './AttachmentButton';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<AttachmentButton />', () => {
    it('should render', () => {
        const wrapper = shallow(
            <AttachmentButton
                id="test"
                onFileSelected={sinon.spy()}
            />);
        expect(wrapper).to.have.length(1);
    });

    it('should accept files with pdf extension', () => {
        const onFileSelectedSpy = sinon.spy();
        const wrapper = shallow(
            <AttachmentButton
                id="test"
                onFileSelected={onFileSelectedSpy}
            />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { files: [new File([''], 'mockFile.pdf')] }});
        expect(onFileSelectedSpy.callCount).to.be.eq(1);
    });

    it('should not allow files with illegal file extension', () => {
        const onFileSelectedSpy = sinon.spy();
        const wrapper = shallow(
            <AttachmentButton
                id="test"
                onFileSelected={onFileSelectedSpy}
            />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { files: [new File([''], 'mockFile.exe')] }});
        input.simulate('change', { target: { files: [new File([''], 'mockFile')] }});
        expect(onFileSelectedSpy.callCount).to.be.eq(0);
    });

    it('should not allow files larger than 50mb ', () => {
        const onFileSelectedSpy = sinon.spy();
        const wrapper = shallow(
            <AttachmentButton
                id="test"
                onFileSelected={onFileSelectedSpy}
            />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { files: [new File([''], 'mockFile.pdf')] }});
    });
});
