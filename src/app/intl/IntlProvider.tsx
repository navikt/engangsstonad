import * as React from 'react';
import { connect } from 'react-redux';
import { IntlProvider as Provider } from 'react-intl';
import moment from 'moment';
import { Språkkode } from './types';
import nnMessages from './nn_NO.json';
import nbMessages from './nb_NO.json';
import enMessages from './en_US.json';
import { AppState } from 'reducers/reducers';

interface Props {
    språkkode: Språkkode;
    children: React.ReactNode;
}

moment.locale('nb');

const getLanguageMessages = (språkkode: Språkkode) => {
    if (språkkode === 'nb') {
        return nbMessages;
    } else if (språkkode === 'nn') {
        return nnMessages;
    } else {
        return enMessages;
    }
};

const mapStateToProps = (state: AppState) => ({
    språkkode: state.commonReducer.språkkode,
});

const IntlProvider: React.FunctionComponent<Props> = ({ språkkode, children }) => {
    return (
        <Provider locale={språkkode} messages={getLanguageMessages(språkkode) || {}}>
            {children}
        </Provider>
    );
};
export default connect(mapStateToProps)(IntlProvider);
