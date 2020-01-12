import * as React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';
import * as en from 'react-intl/locale-data/en';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';
import enMessages from './en_US.json';
import { AppState } from 'reducers/reducers';

interface Props {
    language: Language;
}

export const enum Language {
    BOKMÅL = 'nb',
    NYNORSK = 'nn',
    ENGELSK = 'en'
}

const getLanguageMessages = (language: Language) => {
    if (language === Language.BOKMÅL) {
        return nbMessages;
    } else if (language === Language.NYNORSK) {
        return nnMessages;
    } else {
        return enMessages;
    }
};

class IntlProvider extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        addLocaleData([...nb, ...nn, ...en]);
    }

    render() {
        const messages = getLanguageMessages(this.props.language);
        return (
            <Provider locale={Language.BOKMÅL} messages={messages || {}}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(IntlProvider);
