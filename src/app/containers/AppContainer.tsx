import { hot } from 'react-hot-loader/root';
import * as React from 'react';
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
import { AppState } from 'reducers/index';

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
class AppContainer extends React.Component<Props> {
    componentWillMount() {
        if (!this.props.person) {
            this.props.dispatch(api.getPerson());
        }
    }

    renderContent(children: React.ReactNode) {
        return <div className="engangsstonad">{children}</div>;
    }

    getIntroComponent(person: Person, routeProps: RouteComponentProps): React.ReactNode {
        if (erMann(person)) {
            return <ErMann />;
        }
        if (!erMyndig(person)) {
            return <IkkeMyndig />;
        }
        return <Intro {...routeProps} />;
    }

    render() {
        const { godkjentVilkar, kvittering, error, isLoadingPerson, søknadSendt, person } = this.props;
        if (isLoadingPerson || (error && (error as AxiosResponse).status === 401)) {
            return this.renderContent(<Spinner type="XXL" />);
        }
        if (søknadSendt && error && (error as AxiosResponse).status > 401) {
            return this.renderContent(<InnsendingFeilet error={error} />);
        }
        if (error || !person) {
            return this.renderContent(<GenerellFeil />);
        }
        return this.renderContent(
            <Switch>
                {kvittering ? (
                    <Route path="/engangsstonad" component={SøknadSendt} exact={true} />
                ) : (
                        <Route
                            path="/engangsstonad"
                            render={(routeProps) => this.getIntroComponent(person, routeProps)}
                            exact={true}
                        />
                    )}
                {godkjentVilkar && !søknadSendt && (
                    <Route path={'/engangsstonad/soknad'} exact={true} strict={true} component={Skjema} />
                )}
                <Redirect to="/engangsstonad" />
            </Switch>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    error: state.apiReducer.error,
    person: state.apiReducer.person,
    isLoadingPerson: state.apiReducer.isLoadingPerson,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    kvittering: state.apiReducer.kvittering,
    søknadSendt: state.apiReducer.søknadSendt,
    language: state.commonReducer.language
});

export default connect<StateProps, {}, {}>(mapStateToProps)(hot(AppContainer));
