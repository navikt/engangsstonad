import * as React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';
import * as en from 'react-intl/locale-data/en';

import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';
import enMessages from './en_US.json';

interface Props {
    language: string;
}

const getLanguageMessages = (language: string) => {
    if (language === 'nb') {
        return nbMessages;
    } else if (language === 'nn') {
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
            <Provider locale="nb" messages={messages || {}}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: any) => ({
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(IntlProvider);
