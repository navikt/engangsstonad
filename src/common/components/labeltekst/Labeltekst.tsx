import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import './labeltekst.less';

interface OwnProps {
    children?: React.ReactNode;
    intlId?: string;
    intlValue?: { [key: string]: string | number };
}

export type Props = OwnProps & WrappedComponentProps;

const Labeltekst: React.StatelessComponent<Props> = ({
    children,
    intlId,
    intlValue,
    intl
}) => (
    <span className="labeltext">
        {intlId ? intl.formatMessage({ id: intlId }, intlValue) : children}
    </span>
);

export default injectIntl(Labeltekst);
