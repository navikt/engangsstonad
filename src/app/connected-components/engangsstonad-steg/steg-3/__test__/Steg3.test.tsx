import * as React from 'react';
import { shallow } from 'enzyme';
import Steg3 from '../Steg3';
import { Questions } from '../questions';

describe('Steg3', () => {
    it('kun harVærtIUtlandSiste12Mnd spørsmål skal være synlig ved initiell render', () => {
        const wrapper = shallow(
            <Steg3
                formikProps={
                    {
                        values: {
                            [Questions.harVærtIUtlandSiste12Mnd]: undefined,
                            [Questions.oppholdSiste12Mnd]: [],
                            [Questions.oppholdNeste12Mnd]: []
                        }
                    } as any
                }
            />
        );
        expect(wrapper.find({ name: Questions.harVærtIUtlandSiste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.oppholdSiste12Mnd }).length).toEqual(0);
        expect(wrapper.find({ name: Questions.skalVæreIUtlandNeste12Mnd }).length).toEqual(0);
        expect(wrapper.find({ name: Questions.oppholdNeste12Mnd }).length).toEqual(0);
    });

    it('oppholdSiste12mnd spørsmål skal være synlig hvis harVærtIUtlandSiste12Mnd er true', () => {
        const wrapper = shallow(
            <Steg3
                formikProps={
                    {
                        values: {
                            [Questions.harVærtIUtlandSiste12Mnd]: true,
                            [Questions.oppholdSiste12Mnd]: [],
                            [Questions.oppholdNeste12Mnd]: []
                        }
                    } as any
                }
            />
        );
        expect(wrapper.find({ name: Questions.harVærtIUtlandSiste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.oppholdSiste12Mnd }).length).toEqual(1);
    });

    it('skalVæreIUtlandNeste12Mnd spørsmål skal være synlig hvis oppholdSiste12mnd har minst et element', () => {
        const wrapper = shallow(
            <Steg3
                formikProps={
                    {
                        values: {
                            [Questions.harVærtIUtlandSiste12Mnd]: true,
                            [Questions.oppholdSiste12Mnd]: [{ land: 'US', fom: '2020-01-01', tom: '2020-02-01' }],
                            [Questions.oppholdNeste12Mnd]: []
                        }
                    } as any
                }
            />
        );
        expect(wrapper.find({ name: Questions.harVærtIUtlandSiste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.oppholdSiste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.skalVæreIUtlandNeste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.oppholdNeste12Mnd }).length).toEqual(0);
    });

    it('skalVæreIUtlandNeste12Mnd spørsmål skal være synlig hvis harVærtIUtlandSiste12Mnd er false', () => {
        const wrapper = shallow(
            <Steg3
                formikProps={
                    {
                        values: {
                            [Questions.harVærtIUtlandSiste12Mnd]: false,
                            [Questions.oppholdSiste12Mnd]: [],
                            [Questions.oppholdNeste12Mnd]: []
                        }
                    } as any
                }
            />
        );
        expect(wrapper.find({ name: Questions.harVærtIUtlandSiste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.oppholdSiste12Mnd }).length).toEqual(0);
        expect(wrapper.find({ name: Questions.skalVæreIUtlandNeste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.oppholdNeste12Mnd }).length).toEqual(0);
    });

    it('oppholdNeste12Mnd spørsmål skal være synlig hvis skalVæreIUtlandNeste12Mnd er true', () => {
        const wrapper = shallow(
            <Steg3
                formikProps={
                    {
                        values: {
                            [Questions.harVærtIUtlandSiste12Mnd]: false,
                            [Questions.oppholdSiste12Mnd]: [],
                            [Questions.skalVæreIUtlandNeste12Mnd]: true,
                            [Questions.oppholdNeste12Mnd]: []
                        }
                    } as any
                }
            />
        );
        expect(wrapper.find({ name: Questions.skalVæreIUtlandNeste12Mnd }).length).toEqual(1);
        expect(wrapper.find({ name: Questions.oppholdNeste12Mnd }).length).toEqual(1);
    });
});
