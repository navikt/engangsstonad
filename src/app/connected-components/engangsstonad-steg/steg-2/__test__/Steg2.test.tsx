import * as React from 'react';
import { shallow } from 'enzyme';
import Steg2 from '../Steg2';
import { Questions } from '../../steg-2/questions';
import Input from 'components/form/input/Input';
import Checkbox from 'components/form/checkbox/Checkbox';
import Select from 'components/form/select/Select';
import { Language } from 'intl/IntlProvider';

describe('Steg2', () => {
    it('spørsmål med id navn og kanIkkeOppgis skal være synlig ved initiell render', () => {
        const wrapper = shallow(
            <Steg2 formikProps={{ values: {} } as any} language={Language.BOKMÅL} intl={{} as any} />
        );
        console.log(wrapper.debug());
        expect(wrapper.find(`#${Questions.navn}`)).toBeDefined();
        expect(wrapper.find(`#${Questions.kanIkkeOppgis}`)).toBeDefined();
        expect(wrapper.find(Input).length).toEqual(1);
        expect(wrapper.find(Checkbox).length).toEqual(1);
    });

    it('input for fødselsnummer og checkbox for utenlansk fødselsnummer skal være synlig hvis spørsmål om navn er besvart', () => {
        const wrapper = shallow(
            <Steg2
                formikProps={{ values: { [Questions.navn]: 'Rolf' } } as any}
                language={Language.BOKMÅL}
                intl={{} as any}
            />
        );
        expect(wrapper.find(`#${Questions.fodselsnummer}`)).toBeDefined();
        expect(wrapper.find(`#${Questions.utenlandskFodselsnummer}`)).toBeDefined();
        expect(wrapper.find(Input).length).toEqual(2);
        expect(wrapper.find(Checkbox).length).toEqual(2);
    });

    it('dropdown med bostedsland skal vises hvis spørsmål om fødselsnummer er besvart og bruker har utenlandsk fødselsnummer', () => {
        const values = {
            [Questions.navn]: 'Rolf',
            [Questions.fodselsnummer]: '123',
            [Questions.utenlandskFodselsnummer]: true
        };
        const wrapper = shallow(<Steg2 formikProps={{ values } as any} language={Language.BOKMÅL} intl={{} as any} />);
        expect(wrapper.find(`#${Questions.fodselsnummer}`)).toBeDefined();
        expect(wrapper.find(`#${Questions.utenlandskFodselsnummer}`)).toBeDefined();
        expect(wrapper.find(Input).length).toEqual(2);
        expect(wrapper.find(Checkbox).length).toEqual(2);
        expect(wrapper.find(Select).length).toEqual(1);
    });
});
