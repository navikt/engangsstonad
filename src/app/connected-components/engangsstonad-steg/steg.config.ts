import getMessage from 'util/i18n/i18nUtils';
import InjectedIntl = ReactIntl.InjectedIntl;

const stepIntlIds = [
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'relasjonBarn.sectionheading'
    },
    {
        fortsettKnappLabelIntlId: 'standard.button.neste',
        stegIndikatorLabelIntlId: 'medlemmskap.sectionheading'
    },
    {
        fortsettKnappLabelIntlId: 'standard.sectionheading',
        stegIndikatorLabelIntlId: 'oppsummering.sectionheading'
    }
];

export default (intl: InjectedIntl) => stepIntlIds.map((step) => ({
    fortsettKnappLabel: getMessage(intl, step.fortsettKnappLabelIntlId),
    stegIndikatorLabel: getMessage(intl, step.stegIndikatorLabelIntlId)
}));
