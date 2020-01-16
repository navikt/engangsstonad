import Steg1ValidationSchema from '../validationSchema';
import { Question } from '../questions';
import * as  moment from 'moment';

describe('barn validation schema', () => {
    describe('født barn', () => {
        it('fødesldato skal ikke kunne være frem i tid', async () => {
            const datoFremITid = moment().add(1, 'days').format(moment.HTML5_FMT.DATE);
            await expect(
                Steg1ValidationSchema().validateAt(Question.fødselsdato, {
                    [Question.erFødt]: true,
                    [Question.fødselsdato]: datoFremITid
                } as any)
            ).rejects.toBeDefined();
        });

        it('komplett skjema for født barn skal passere validering', async () => {
            const komplettSkjemaForFødtBarn = {
                [Question.erFødt]: true,
                [Question.antallBarn]: 1,
                [Question.fødselsdato]: '2020-01-01'
            };
            await expect(Steg1ValidationSchema().isValid(komplettSkjemaForFødtBarn)).resolves.toBeTruthy();
        });

        it('ukomplett skjema for født barn skal ikke passere validering', async () => {
            const komplettSkjemaForFødtBarn = {
                [Question.erFødt]: true,
                [Question.antallBarn]: 1
            };
            await expect(Steg1ValidationSchema().isValid(komplettSkjemaForFødtBarn)).resolves.toBeFalsy();
        });
    });

    describe('ufødt barn', () => {
        it('komplett skjema for født barn skal passere validering', async () => {
            const komplettSkjemaForFødtBarn = {
                [Question.erFødt]: true,
                [Question.antallBarn]: 1,
                [Question.fødselsdato]: '2020-01-01'
            };
            await expect(Steg1ValidationSchema().isValid(komplettSkjemaForFødtBarn)).resolves.toBeTruthy();
        });

        it('ukomplett skjema for født barn skal ikke passere validering', async () => {
            const komplettSkjemaForFødtBarn = {
                [Question.erFødt]: true,
                [Question.antallBarn]: 1
            };
            await expect(Steg1ValidationSchema().isValid(komplettSkjemaForFødtBarn)).resolves.toBeFalsy();
        });
    });
});
