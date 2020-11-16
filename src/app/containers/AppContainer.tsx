import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import Spinner from 'nav-frontend-spinner';
import { AxiosResponse } from 'axios';
import { apiActionCreators as api } from '../redux/actions';
import { DispatchProps } from 'common/redux/types';
import Person from '../types/domain/Person';
import Kvittering from '../types/services/Kvittering';
import Intro from '../connected-components/intro/Intro';
import Skjema from './SøknadContainer';
import ErMann from '../connected-components/feilsider/ErMann';
import IkkeMyndig from '../connected-components/feilsider/IkkeMyndig';
import { erMyndig, erMann } from 'util/validation/validationUtils';
import SøknadSendt from '../connected-components/soknad-sendt/SøknadSendt';
import GenerellFeil from '../connected-components/feilsider/GenerellFeil';
import InnsendingFeilet from '../connected-components/feilsider/InnsendingFeilet';
import { AppState } from 'reducers/reducers';

import '../styles/engangsstonad.less';

interface StateProps {
    person?: Person;
    error: AxiosResponse | Error | undefined;
    isLoadingPerson: boolean;
    godkjentVilkar: boolean;
    kvittering?: Kvittering;
    søknadSendt: boolean;
}

type Props = StateProps & DispatchProps;

const AppContainer: React.FunctionComponent<Props> = ({
    godkjentVilkar,
    kvittering,
    error,
    isLoadingPerson,
    søknadSendt,
    person,
    dispatch,
}) => {
    useEffect(() => {
        if (!person) {
            dispatch(api.getPerson());
        }
    }, []);

    const renderContent = (children: React.ReactNode) => {
        return <div className="engangsstonad">{children}</div>;
    };

    const getIntroComponent = (p: Person, routeProps: RouteComponentProps): React.ReactNode => {
        if (erMann(p)) {
            return <ErMann />;
        }
        if (!erMyndig(p)) {
            return <IkkeMyndig />;
        }
        return <Intro {...routeProps} />;
    };

    if (isLoadingPerson || (error && (error as AxiosResponse).status === 401)) {
        return renderContent(<Spinner type="XXL" />);
    }
    if (søknadSendt && error && (error as AxiosResponse).status > 401) {
        return renderContent(<InnsendingFeilet error={error} />);
    }
    if (error || !person) {
        return renderContent(<GenerellFeil />);
    }

    return renderContent(
        <Switch>
            {kvittering ? (
                <Route path="/engangsstonad" component={SøknadSendt} exact={true} />
            ) : (
                <Route
                    path="/engangsstonad"
                    render={(routeProps) => getIntroComponent(person!, routeProps)}
                    exact={true}
                />
            )}
            {godkjentVilkar && !søknadSendt && (
                <Route path={'/engangsstonad/soknad'} exact={true} strict={true} component={Skjema} />
            )}
            <Redirect to="/engangsstonad" />
        </Switch>
    );
};
const mapStateToProps = (state: AppState) => ({
    error: state.apiReducer.error,
    person: state.apiReducer.person,
    isLoadingPerson: state.apiReducer.isLoadingPerson,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    kvittering: state.apiReducer.kvittering,
    søknadSendt: state.apiReducer.søknadSendt,
    språkkode: state.commonReducer.språkkode,
});

export default connect<StateProps, {}, {}>(mapStateToProps)(AppContainer);
