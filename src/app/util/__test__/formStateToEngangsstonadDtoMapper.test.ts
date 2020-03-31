import { mapFormStateToEngangsstonadDto } from '../formStateToEngangsttonadDtoMapper';
import { Language } from 'intl/IntlProvider';
import { FormProps } from 'app/engangsstonad/FormProps';
import { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';

describe('mapFormStateToEngangsstonadDto', () => {
    let formValues: FormProps;
    beforeEach(() => {
        formValues = {
            erFødt: true,
            antallBarn: 1,
            fodselsdato: '2020-01-01',
            termindato: '2020-01-01',
            // tslint:disable-next-line: no-object-literal-type-assertion
            terminberkreftelse: [],
            terminbekreftelseDato: '2020-01-01',
            navn: 'jens',
            kanIkkeOppgis: false,
            fodselsnummer: '123456789',
            utenlandskFodselsnummer: false,
            bostedsland: 'EN',
            harVærtIUtlandSiste12Mnd: false,
            // tslint:disable-next-line: no-object-literal-type-assertion
            oppholdSiste12Mnd: [{} as Utenlandsopphold],
            skalVæreIUtlandNeste12Mnd: false,
            // tslint:disable-next-line: no-object-literal-type-assertion
            oppholdNeste12Mnd: [{} as Utenlandsopphold]
        };
    });

    it('skal mappe født barn riktig', () => {
        const barn = mapFormStateToEngangsstonadDto({ ...formValues, erFødt: true }, Language.BOKMÅL).barn;
        expect(barn).toMatchObject({ erBarnetFødt: true, antallBarn: 1, fødselsdatoer: ['2020-01-01'] });
    });

    it('skal mappe ufødt barn riktig', () => {
        const barn = mapFormStateToEngangsstonadDto({ ...formValues, erFødt: false }, Language.BOKMÅL).barn;
        expect(barn).toMatchObject({
            erBarnetFødt: false,
            antallBarn: 1,
            termindato: '2020-01-01',
            terminbekreftelse: [],
            terminbekreftelseDato: '2020-01-01'
        });
    });
});
