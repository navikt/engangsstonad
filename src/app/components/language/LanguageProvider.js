// @flow
import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';

import ElementWrapper from './../../util/ElementWrapper';

addLocaleData(nb);

type Props = {
    nbMessages: Object,
    children: Element
}

export const LanguageProvider = (props: Props) => (
    <IntlProvider locale="nb-NO" messages={props.nbMessages}>
        <ElementWrapper>
            {props.children}
        </ElementWrapper>
    </IntlProvider>
);

export default LanguageProvider;
