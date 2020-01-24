import { Questions } from '../questions';
import Steg2ValidationSchema from '../validationSchema';

describe('annen forelder', () => {
    it('skal passere hvis annen forelder ikke kan oppgis', async () => {
        await expect(
            Steg2ValidationSchema().validate({
                [Questions.kanIkkeOppgis]: true
            } as any)
        ).resolves.toBeTruthy();
    });

    it('navn skal være påbudt hvis den andre foreldreren kan oppgis', async () => {
        await expect(
            Steg2ValidationSchema().validateAt(Questions.navn, {
                [Questions.kanIkkeOppgis]: false,
                [Questions.navn]: ''
            } as any)
        ).rejects.toBeDefined();

        await expect(
            Steg2ValidationSchema().validateAt(Questions.navn, {
                [Questions.kanIkkeOppgis]: false,
                [Questions.navn]: undefined
            } as any)
        ).rejects.toBeDefined();

        await expect(
            Steg2ValidationSchema().validateAt(Questions.navn, {
                [Questions.kanIkkeOppgis]: false,
                [Questions.navn]: 'Leif'
            } as any)
        ).resolves.toBeTruthy();
    });

    it('fødselsnummer skal være påbudt hvis den andre foreldreren kan oppgis', async () => {
        await expect(
            Steg2ValidationSchema().validateAt(Questions.fodselsnummer, {
                [Questions.kanIkkeOppgis]: false
            } as any)
        ).rejects.toBeDefined();
    });

    it('fødselsnummer må være gyldig norsk fødselsnummer hvis den andre foreldreren ikke er utenlandsk', async () => {
        await expect(
            Steg2ValidationSchema().validateAt(Questions.fodselsnummer, {
                [Questions.kanIkkeOppgis]: false,
                [Questions.fodselsnummer]: '2406166345231' // uhyldig
            } as any)
        ).rejects.toBeDefined();

        await expect(
            Steg2ValidationSchema().validateAt(Questions.fodselsnummer, {
                [Questions.kanIkkeOppgis]: false,
                [Questions.fodselsnummer]: '24061663459' // generert fnr
            } as any)
        ).resolves.toBeTruthy();
    });

    it('bostedsland er påbudt hvis annen part er utenlandsk', async () => {
        await expect(
            Steg2ValidationSchema().validateAt(Questions.bostedsland, {
                [Questions.kanIkkeOppgis]: false,
                [Questions.utenlandskFodselsnummer]: true,
                [Questions.bostedsland]: undefined
            } as any)
        ).rejects.toBeDefined();
    });
});
