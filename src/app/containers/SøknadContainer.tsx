import * as React from 'react';
import { useIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import { sendSoknad } from 'actions/api/apiActionCreators';
import { ApiActionTypes } from 'actions/api/apiActionDefinitions';
import Person from 'app/types/domain/Person';
import Skjema from 'components/form/skjema/Skjema';
import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';
import { Language } from 'intl/IntlProvider';
import { AppState } from 'reducers/index';
import { FormProps } from 'app/engangsstonad/FormProps';

import { getStepConfig } from '../engangsstonad/steg.config';

interface Props {
    language: Language;
    person: Person;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
    sendSøknad: (values: Partial<FormProps>) => void;
}

const SøknadContainer: React.FunctionComponent<Props & RouteComponentProps> = ({
    person,
    søknadSendingInProgress,
    language,
    sessionHasExpired,
    sendSøknad
}) => (
    <Skjema
        stegConfig={getStepConfig(useIntl(), person)}
        language={language}
        søknadSendingInProgress={søknadSendingInProgress}
        sessionHasExpired={sessionHasExpired}
        sendSøknad={sendSøknad}
    />
);

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language,
    person: state.apiReducer.person!,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    sessionHasExpired: state.apiReducer.sessionHasExpired
});

const mapDispatchToProps = (dispatch: (action: ApiActionTypes) => void, props: Props) => ({
    sendSøknad: (values: Partial<FormProps>) => {
        dispatch(sendSoknad(mapFormStateToEngangsstonadDto(values, props.language)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SøknadContainer);