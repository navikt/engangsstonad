import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import './labeltext.less';

interface OwnProps {
    children?: React.ReactNode;
    key?: string;
    intlValues?: any;
}

export type Props = OwnProps & InjectedIntlProps;

const LabelText: React.StatelessComponent<Props> = ({ children, key, intlValues, intl }) => (
    <span className="labeltext">{key ? intl.formatMessage({ id: key }, intlValues) : children}</span>
);

export default injectIntl(LabelText);
