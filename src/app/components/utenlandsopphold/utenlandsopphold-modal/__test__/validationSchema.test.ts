import UtenlandsoppholdValidationSchema from '../CountryPickerValidationSchema';
import { Questions } from '../questions';
import * as moment from 'moment';

describe('Utenlandsopphold validation schema', () => {
    it('land skal være påkrevd', async () => {
        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.land, {
                [Questions.land]: undefined
            } as any)
        ).rejects.toBeDefined();

        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.land, {
                [Questions.land]: ''
            } as any)
        ).rejects.toBeDefined();

        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.land, {
                [Questions.land]: 'US'
            } as any)
        ).resolves.toBeTruthy();
    });

    it('fom dato skal være påkrevd', async () => {
        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.fom, {
                [Questions.fom]: undefined
            } as any)
        ).rejects.toBeDefined();

        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.fom, {
                [Questions.fom]: ''
            } as any)
        ).rejects.toBeDefined();

        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.fom, {
                [Questions.fom]: moment().format(moment.HTML5_FMT.DATE)
            } as any)
        ).resolves.toBeTruthy();
    });

    it('tom dato skal være påkrevd', async () => {
        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.tom, {
                [Questions.tom]: undefined
            } as any)
        ).rejects.toBeDefined();

        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.tom, {
                [Questions.tom]: ''
            } as any)
        ).rejects.toBeDefined();

        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.tom, {
                [Questions.tom]: moment().format(moment.HTML5_FMT.DATE)
            } as any)
        ).resolves.toBeTruthy();
    });

    it('Et utenlandsopphold skal ikke kunne være utenfor gyldig tidsperiode', async () => {
        const gyldigTidsperiode = {
            fom: moment()
                .subtract(1, 'day')
                .format(moment.HTML5_FMT.DATE),
            tom: moment()
                .add(1, 'day')
                .format(moment.HTML5_FMT.DATE)
        };

        await expect(
            UtenlandsoppholdValidationSchema(gyldigTidsperiode).validateAt(Questions.fom, {
                [Questions.fom]: gyldigTidsperiode.fom,
                [Questions.tom]: gyldigTidsperiode.tom
            } as any)
        ).resolves.toBeTruthy();

        await expect(
            UtenlandsoppholdValidationSchema(gyldigTidsperiode).validateAt(Questions.fom, {
                [Questions.fom]: gyldigTidsperiode.fom,
                [Questions.tom]: moment()
                    .add(2, 'days')
                    .format(moment.HTML5_FMT.DATE)
            } as any)
        ).resolves.toBeTruthy();
    });

    it('Skal ikke kunne være utenfor gyldig tidsperiode', async () => {
        await expect(
            UtenlandsoppholdValidationSchema(undefined, [
                {
                    fom: moment()
                        .subtract(1, 'day')
                        .format(moment.HTML5_FMT.DATE),
                    tom: moment()
                        .add(1, 'day')
                        .format(moment.HTML5_FMT.DATE)
                }
            ]).validateAt(Questions.tom, {
                [Questions.tom]: undefined
            } as any)
        ).rejects.toBeDefined();
    });


    it('fom dato skal ikke kunne være etter tom dato', async () => {
        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.tom, {
                [Questions.fom]: moment().add(1, 'days').format(moment.HTML5_FMT.DATE),
                [Questions.tom]: moment().subtract(1, 'days').format(moment.HTML5_FMT.DATE)
            } as any)
        ).rejects.toBeDefined();
    });

    it('tom dato skal ikke kunne være før fom dato', async () => {
        await expect(
            UtenlandsoppholdValidationSchema().validateAt(Questions.tom, {
                [Questions.fom]: moment().add(1, 'days').format(moment.HTML5_FMT.DATE),
                [Questions.tom]: moment().subtract(1, 'days').format(moment.HTML5_FMT.DATE)
            } as any)
        ).rejects.toBeDefined();
    });
});
