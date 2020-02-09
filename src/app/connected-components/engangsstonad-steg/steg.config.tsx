import * as React from 'react';

import Person from 'app/types/domain/Person';
import { StepConfig } from 'app/types/StepConfig';

import Steg1 from './steg-1/Steg1';
import Steg2 from './steg-2/Steg2';
import Steg3 from './steg-3/Steg3';
import Steg4 from './steg-4/Steg4';

import Steg1ValidationSchema from './steg-1/validationSchema';
import Steg2ValidationSchema from './steg-2/validationSchema';
import Steg3ValidationSchema from './steg-3/validationSchema';

import getMessage from 'common/util/i18nUtils';
import { IntlShape } from 'react-intl';
import StegProps from './StegProps';

const stepConfig = [
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'relasjonBarn.sectionheading',
        component: (props: StegProps) => <Steg1 {...props} />,
        validationSchema: Steg1ValidationSchema
    },
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'annenForelder.sectionheading',
        component: (props: StegProps) => <Steg2 {...props} />,
        validationSchema: Steg2ValidationSchema
    },
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'medlemmskap.sectionheading',
        component: (props: StegProps) => <Steg3 {...props} />,
        validationSchema: Steg3ValidationSchema
    },
    {
        fortsettKnappLabelIntlId: 'standard.sectionheading',
        stegIndikatorLabelIntlId: 'oppsummering.sectionheading',
        component: (props: StegProps) => <Steg4 {...props} />
    }
];

export default (intl: IntlShape, person: Person): StepConfig[] =>
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
