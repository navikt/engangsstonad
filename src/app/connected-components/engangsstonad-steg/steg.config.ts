import getMessage from 'util/i18n/i18nUtils';
import InjectedIntl = ReactIntl.InjectedIntl;
import Steg1 from './Steg1';
import Steg2 from './Steg2';
import Steg3 from './Steg3';
import Steg4 from './Steg4';
import {
    shouldDisplayNextButtonOnStep1,
    shouldDisplayNextButtonOnStep2,
    shouldDisplayNextButtonOnStep3
} from 'util/stepUtil';
import Person from 'app/types/domain/Person';
import Barn from '../../types/domain/Barn';
import InformasjonOmUtenlandsopphold from '../../types/domain/InformasjonOmUtenlandsopphold';
import AnnenForelder from '../../types/domain/AnnenForelder';
import { StepConfig } from 'app/types/StepConfig';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export interface NextStepCondition {
    type: string;
    erEndringssøknad: boolean;
    barn: Barn;
    annenForelder: AnnenForelder;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    vedlegg: Attachment[];
}

const stepConfig = [
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'relasjonBarn.sectionheading',
        component: Steg1,
        nextStepCondition: (data: NextStepCondition) =>
            shouldDisplayNextButtonOnStep1(data.barn)
    },
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'annenForelder.sectionheading',
        component: Steg2,
        nextStepCondition: (data: NextStepCondition) =>
            shouldDisplayNextButtonOnStep2(data.annenForelder)
    },
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'medlemmskap.sectionheading',
        component: Steg3,
        nextStepCondition: (data: NextStepCondition) =>
            shouldDisplayNextButtonOnStep3(data.barn, data.informasjonOmUtenlandsopphold)
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
