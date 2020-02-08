import * as React from 'react';
import { connect } from 'react-redux';
import { IntlProvider as Provider } from 'react-intl';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';
import enMessages from './en_US.json';

import { AppState } from 'reducers/index';

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
        // addLocaleData([...nb, ...nn, ...en]); // TODO
    }

    render() {
        return (
            <Provider locale={Language.BOKMÅL} messages={getLanguageMessages(this.props.language)}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(IntlProvider);
