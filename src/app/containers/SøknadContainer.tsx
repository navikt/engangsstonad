import * as React from 'react';
import { useIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import { Søkerinfo } from 'app/types/domain/Søkerinfo';
import { sendSoknad } from 'actions/api/apiActionCreators';
import { ApiActionTypes } from 'actions/api/apiActionDefinitions';
import { FormProps } from 'app/engangsstonad/FormProps';
import Skjema from 'components/form/skjema/Skjema';
import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';
import { Language } from 'intl/IntlProvider';
import { AppState } from 'reducers/index';

import { getStepConfig } from '../engangsstonad/steg.config';

interface Props {
    language: Language;
    søkerinfo: Søkerinfo;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
    sendSøknad: (values: Partial<FormProps>) => void;
}

const SøknadContainer: React.FunctionComponent<Props & RouteComponentProps> = ({
    søkerinfo,
    søknadSendingInProgress,
    language,
    sessionHasExpired,
    sendSøknad
}) => (
    <Skjema
        stegConfig={getStepConfig(useIntl(), søkerinfo)}
        language={language}
        søknadSendingInProgress={søknadSendingInProgress}
        sessionHasExpired={sessionHasExpired}
        sendSøknad={sendSøknad}
    />
);

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language,
    søkerinfo: state.apiReducer.søkerinfo!,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    sessionHasExpired: state.apiReducer.sessionHasExpired
});

const mapDispatchToProps = (dispatch: (action: ApiActionTypes) => void, props: Props) => ({
    sendSøknad: (values: Partial<FormProps>) => {
        dispatch(sendSoknad(mapFormStateToEngangsstonadDto(values, props.language)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SøknadContainer);