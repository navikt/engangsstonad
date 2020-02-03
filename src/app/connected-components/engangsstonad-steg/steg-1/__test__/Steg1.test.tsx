import * as React from 'react';
import { shallow } from 'enzyme';
import Steg1 from '../Steg1';
import { Questions } from '../questions';
import { Attachment } from 'common/storage/attachment/types/Attachment';

describe('Steg1', () => {
    it('kun erFødt spørsmål skal være synlig ved initiell render', () => {
        const wrapper = shallow(<Steg1 formikProps={{ values: {}, touched: {} } as any} />);
        expect(wrapper.find({ name: Questions.erFødt }).length).toEqual(1);
        expect(wrapper.children().length).toEqual(1);
    });

    it('antallBarn spørsmål skal være synlig når erFødt er besvart', () => {
        const wrapper = shallow(<Steg1 formikProps={{ values: {}, touched: { [Questions.erFødt]: true } } as any} />);
        expect(wrapper.find({ name: Questions.erFødt }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.antallBarn }).length).toEqual(1);
        expect(wrapper.children().length).toEqual(2);
    });

    describe('resternde skjema for født barn', () => {
        it('fødselsdato spørsmål skal vises når erFødt er true og antallBarn er besvart', () => {
            const wrapper = shallow(
                <Steg1
                    formikProps={
                        {
                            values: { [Questions.erFødt]: true },
                            touched: { [Questions.erFødt]: true, [Questions.antallBarn]: true }
                        } as any
                    }
                />
            );

            expect(wrapper.find({ name: Questions.erFødt }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.antallBarn }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.fødselsdato }).length).toEqual(1);
            expect(wrapper.children().length).toEqual(3);
        });
    });

    describe('resterende skjema for ufødt barn', () => {
        it('termindato spørsmål skal vises når erFødt er false og antallBarn er besvart', () => {
            const wrapper = shallow(
                <Steg1
                    formikProps={
                        {
                            values: { [Questions.erFødt]: false, [Questions.terminberkreftelse]: [] },
                            touched: { [Questions.erFødt]: true, [Questions.antallBarn]: true }
                        } as any
                    }
                />
            );

            expect(wrapper.find({ name: Questions.erFødt }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.antallBarn }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.termindato }).length).toEqual(1);
        });

        it('skal vise veilederpanel og spørsmål for terminbekreftelse når termindato feltet har en verdi', () => {
            const wrapper = shallow(
                <Steg1
                    formikProps={
                        {
                            values: {
                                [Questions.erFødt]: false,
                                [Questions.terminberkreftelse]: [],
                                [Questions.termindato]: '2019-01-01'
                            },
                            touched: { [Questions.erFødt]: true, [Questions.antallBarn]: true }
                        } as any
                    }
                />
            );

            expect(wrapper.find({ name: Questions.erFødt }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.antallBarn }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.termindato }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.terminberkreftelse }).length).toEqual(1);
        });

        it('skal vise terminbekreftelsesdato når terminbrekftelsen er lastet opp', () => {
            const wrapper = shallow(
                <Steg1
                    formikProps={
                        {
                            values: {
                                [Questions.erFødt]: false,
                                [Questions.termindato]: '2019-01-01',
                                // tslint:disable-next-line: no-object-literal-type-assertion
                                [Questions.terminberkreftelse]: [{} as Attachment]
                            },
                            touched: { [Questions.erFødt]: true, [Questions.antallBarn]: true }
                        } as any
                    }
                />
            );

            expect(wrapper.find({ name: Questions.erFødt }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.antallBarn }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.termindato }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.terminberkreftelse }).length).toEqual(1);
            expect(wrapper.find({ name: Questions.terminbekreftelseDato }).length).toEqual(1);
        });
    });
});
