import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import Person from 'app/types/domain/Person';
import { StepConfig } from 'app/types/StepConfig';
import { FormikProps } from 'formik';
import { FormProps } from './FormProps';
import Steg1 from './steg-1/Steg1';
import Steg2 from './steg-2/Steg2';
import Steg4 from './Steg4';
import getMessage from 'common/util/i18nUtils';
import Steg1ValidationSchema from './steg-1/validationSchema';
import Steg2ValidationSchema from './steg-2/validationSchema';

const stepConfig = [
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'relasjonBarn.sectionheading',
        component: (formikProps: FormikProps<Partial<FormProps>>) => <Steg1 formikProps={formikProps} />,
        validationSchema: Steg1ValidationSchema
    },
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'annenForelder.sectionheading',
        component: (formikProps: FormikProps<Partial<FormProps>>) => <Steg2 formikProps={formikProps} />,
        validationSchema: Steg2ValidationSchema
    },
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'medlemmskap.sectionheading',
        component: (formikProps: FormikProps<Partial<FormProps>>) => <Steg2 formikProps={formikProps} />,
        nextStepCondition: () => true
    },
    {
        fortsettKnappLabelIntlId: 'standard.sectionheading',
        stegIndikatorLabelIntlId: 'oppsummering.sectionheading',
        component: Steg4,
        nextStepCondition: () => true
    }
];

export default (intl: InjectedIntl, person: Person): StepConfig[] =>
    stepConfig
        .filter((step: any, index: number) => {
            if (index === 1) {
                return person.ikkeNordiskEøsLand;
            } else {
                return true;
            }
        })
        .map((step: any) => ({
            ...step,
            fortsettKnappLabel: getMessage(intl, step.fortsettKnappLabelIntlId),
            stegIndikatorLabel: getMessage(intl, step.stegIndikatorLabelIntlId),
            component: step.component
        }));
