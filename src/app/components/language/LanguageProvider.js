// @flow
import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';

addLocaleData(nb);

type Props = {
    nbMessages: Object,
    children: Element
}

export const LanguageProvider = (props: Props) => (
    <IntlProvider locale="nb-NO" messages={props.nbMessages}>
        <div>
            {props.children}
        </div>
    </IntlProvider>
);

export default LanguageProvider;
