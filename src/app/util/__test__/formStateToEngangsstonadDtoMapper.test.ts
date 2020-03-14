import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';
import { Language } from 'intl/IntlProvider';
import { FormProps } from 'app/engangsstonad/FormProps';
import { Attachment } from 'common/storage/attachment/types/Attachment';
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
            terminberkreftelse: [{} as Attachment],
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

    it('skal mappe ufødt barn riktig', () => {
        const barn = mapFormStateToEngangsstonadDto(formValues, Language.BOKMÅL).barn;
        expect(barn).toHaveProperty(['erBarnetFødt', 'antallBarn', 'fødselsdatoer']);
        expect(Object.keys(barn)).toEqual(3);
    });

    it('skal mappe født barn riktig', () => {
        const barn = mapFormStateToEngangsstonadDto({ ...formValues, erFødt: true }, Language.BOKMÅL).barn;
        expect(barn).toHaveProperty([
            'erBarnetFødt',
            'antallBarn',
            'termindato',
            'terminbebkreftelse',
            'terminbekreftelseDato'
        ]);
        expect(Object.keys(barn)).toEqual(5);
    });

    it('skal mappe annen forelder riktig hvis annen foredlder ikke kan oppgis', () => {
        const annenForelder = mapFormStateToEngangsstonadDto({ ...formValues, kanIkkeOppgis: true }, Language.BOKMÅL)
            .annenForelder;
        expect(annenForelder).toHaveProperty(['kanIkkeOppgis']);
        expect(Object.keys(annenForelder)).toEqual(1);
    });

    it('skal mappe annen forelder riktig hvis annen forelder er kjent', () => {
        const annenForelder = mapFormStateToEngangsstonadDto({ ...formValues, kanIkkeOppgis: false }, Language.BOKMÅL)
            .annenForelder;
        expect(annenForelder).toHaveProperty(['kanIkkeOppgis', 'navn', 'fnr', 'utenlandskFnr']);
        expect(Object.keys(annenForelder)).toEqual(1);
    });
});
