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

export const getStepConfig = (intl: IntlShape, person: Person): StepConfig[] => [
    {
        fortsettKnappLabel: getMessage(intl, 'standard.button.neste'),
        stegIndikatorLabel: getMessage(intl, 'relasjonBarn.sectionheading'),
        component: (props: StegProps) => <Steg1 {...props} />,
        validationSchema: Steg1ValidationSchema,
    },
    ...(person.ikkeNordiskEøsLand
        ? [
              {
                  fortsettKnappLabel: getMessage(intl, 'standard.button.neste'),
                  stegIndikatorLabel: getMessage(intl, 'annenForelder.sectionheading'),
                  component: (props: StegProps) => <Steg2 {...props} />,
                  validationSchema: Steg2ValidationSchema,
              },
          ]
        : []),
    {
        fortsettKnappLabel: getMessage(intl, 'standard.button.neste'),
        stegIndikatorLabel: getMessage(intl, 'medlemmskap.sectionheading'),
        component: (props: StegProps) => <Steg3 {...props} />,
        validationSchema: Steg3ValidationSchema,
    },
    {
        fortsettKnappLabel: getMessage(intl, 'standard.sectionheading'),
        stegIndikatorLabel: getMessage(intl, 'oppsummering.sectionheading'),
        component: (props: StegProps) => <Steg4 {...props} />,
    },
];
