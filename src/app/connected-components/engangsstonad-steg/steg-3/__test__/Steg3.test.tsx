import * as React from 'react';
import { shallow } from 'enzyme';
import Steg3 from '../Steg3';
import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { Questions } from '../questions';

describe('Steg3', () => {
    it('kun harVærtIUtlandSiste12Mnd spørsmål skal være synlig ved initiell render', () => {
        const wrapper = shallow(<Steg3 formikProps={{ values: {} } as any} />);
        expect(wrapper.find(RadioPanelGruppeResponsiveWrapper).length).toEqual(1);
        expect(wrapper.find(`#${Questions.oppholdSiste12Mnd}`)).toBeDefined();
    });
});
