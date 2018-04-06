import * as React from 'react';
import { injectIntl, InjectedIntlProps, MessageValue } from 'react-intl';
import getMessage from 'util/i18n/i18nUtils';

import './labeltext.less';

interface OwnProps {
    children?: React.ReactNode;
    intlId?: string;
    intlValue?: { [key: string]: MessageValue };
}

export type Props = OwnProps & InjectedIntlProps;

const LabelText: React.StatelessComponent<Props> = ({ children, intlId, intlValue, intl }) => (
    <span className="labeltext">{intlId ? getMessage(intl, intlId, intlValue) : children}</span>
);

export default injectIntl(LabelText);
