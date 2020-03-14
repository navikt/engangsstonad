import * as moment from 'moment';

import Steg1ValidationSchema from '../validationSchema';
import { Questions } from '../questions';

import { dagerForTerminbekreftelse } from '../../../util/validation/validationUtils';

describe('barn validation schema', () => {
    describe('født barn', () => {
        it('fødesldato skal ikke kunne være frem i tid', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.fødselsdato, {
                    [Questions.erFødt]: true,
                    [Questions.fødselsdato]: moment()
                        .add(1, 'days')
                        .format(moment.HTML5_FMT.DATE)
                } as any)
            ).rejects.toBeDefined();
        });

        it('fødselsdato skal ikke kunne være mer enn 3 år tilbake i tid', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.fødselsdato, {
                    [Questions.erFødt]: true,
                    [Questions.fødselsdato]: moment()
                        .subtract(3, 'years')
                        .subtract(1, 'day')
                        .format(moment.HTML5_FMT.DATE)
                } as any)
            ).rejects.toBeDefined();
        });

        it('fødselsdato som er nøyaktig 3 år tilbake i tid skal være gyldig', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.fødselsdato, {
                    [Questions.erFødt]: true,
                    [Questions.fødselsdato]: moment()
                        .subtract(3, 'years')
                        .format(moment.HTML5_FMT.DATE)
                } as any)
            ).resolves.toBeTruthy();
        });
    });

    describe('ufødt barn', () => {
        it('Termindato skal være påkrevd', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.termindato, {
                    [Questions.erFødt]: false
                } as any)
            ).rejects.toBeDefined();
        });

        it('termindato kan ikke være en ugyldig dato', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.termindato, {
                    [Questions.erFødt]: false,
                    [Questions.termindato]: '2019-01-32'
                } as any)
            ).rejects.toBeDefined();
        });

        it('terminbekreftelse skal være påkrevd', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.terminberkreftelse, {
                    [Questions.erFødt]: false,
                    [Questions.terminberkreftelse]: []
                } as any)
            ).rejects.toBeDefined();
        });

        it('terminbekreftelsesdato skal ikke være frem i tid', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.terminbekreftelseDato, {
                    [Questions.erFødt]: false,
                    [Questions.terminbekreftelseDato]: moment()
                        .add(1, 'days')
                        .format(moment.HTML5_FMT.DATE)
                } as any)
            ).rejects.toBeDefined();
        });

        it('terminbekreftelsesdato skal kunne være dagens dato', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.terminbekreftelseDato, {
                    [Questions.erFødt]: false,
                    [Questions.terminbekreftelseDato]: moment().format(moment.HTML5_FMT.DATE)
                } as any)
            ).resolves.toBeTruthy();
        });

        it('terminbekreftelsesdato må våre i uke 22 eller senere', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.terminbekreftelseDato, {
                    [Questions.erFødt]: false,
                    [Questions.termindato]: moment().format(moment.HTML5_FMT.DATE),
                    [Questions.terminbekreftelseDato]: moment()
                        .subtract(dagerForTerminbekreftelse, 'days')
                        .format(moment.HTML5_FMT.DATE)
                } as any)
            ).resolves.toBeTruthy();
        });

        it('terminbekreftelsesdato kan ikke være før uke 22', async () => {
            await expect(
                Steg1ValidationSchema().validateAt(Questions.terminbekreftelseDato, {
                    [Questions.erFødt]: false,
                    [Questions.termindato]: moment().format(moment.HTML5_FMT.DATE),
                    [Questions.terminbekreftelseDato]: moment()
                        .subtract(dagerForTerminbekreftelse + 1, 'days')
                        .format(moment.HTML5_FMT.DATE)
                } as any)
            ).rejects.toBeDefined();
        });
    });
});
