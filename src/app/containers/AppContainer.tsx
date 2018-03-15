import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import * as queryStringParser from 'query-string';
import Spinner from 'nav-frontend-spinner';

import Intro from './../connected-components/intro/Intro';
import SøknadSendt from './../connected-components/soknad-sendt/SøknadSendt';
import IkkeMyndig from './../connected-components/feilsider/IkkeMyndig';
import ErMann from '../connected-components/feilsider/ErMann';
import PersonFinnesIkke from '../connected-components/feilsider/PersonFinnesIkke';
import SøknadContainer from './SøknadContainer';
import { erMann, erMyndig, harPersonData } from 'util/validation/validationUtils';

import { apiActionCreators as api } from '../redux/actions';
import { ExternalProps } from '../types';

import { DispatchProps } from '../redux/types';
import Person from '../types/domain/Person';
import { EngangsstonadSoknadResponse } from '../types/services/EngangsstonadSoknadResponse';

import '../styles/engangsstonad.less';

interface StateProps {
    soknad: EngangsstonadSoknadResponse;
    person: Person;
    isLoadingPerson: boolean;
    godkjentVilkar: boolean;
    language: string;
}

type Props = StateProps & ExternalProps & DispatchProps & RouteComponentProps<{}>;

export class AppContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.getQueryParams = this.getQueryParams.bind(this);
    }

    componentWillMount() {
        const { dispatch, person } = this.props;
        if (!person) {
            const queryParams = this.getQueryParams();

            if (Object.keys(queryParams).length > 0) {
                dispatch(api.getPerson(queryParams));
            } else {
                dispatch(api.getPerson());
            }
        }
    }

    getQueryParams() {
        return queryStringParser.parse(this.props.location.search);
    }

    renderContent(children: React.ReactNode) {
        return (
            <div className="engangsstonad">
                {children}
            </div>
        );
    }

    getErrorRoutes(personErMann: boolean, personFinnes: boolean) {
        let component: any = IkkeMyndig;
        if (personErMann) {
            component = ErMann;
        } else if (!personFinnes) {
            component = PersonFinnesIkke;
        }

        return (
            <Switch>
                <Route path="/engangsstonad" component={component} />,
                <Redirect to="/engangsstonad" />
            </Switch>
        );
    }

    getSøknadRoutes() {
        const { godkjentVilkar, person, soknad } = this.props;
        return (
            <Switch>
                <Route path="/engangsstonad" component={Intro} exact={true} />
                {person && soknad && <Route path="/engangsstonad/completed" component={SøknadSendt} />}
                {godkjentVilkar === true && <Route path="/engangsstonad/soknad" component={SøknadContainer} />}
                <Redirect to="/engangsstonad" />
            </Switch>
        );
    }

    render() {
        const { person, isLoadingPerson } = this.props;

        if (isLoadingPerson) {
            return this.renderContent(<Spinner type="XXL"/>);
        }

        if (person) {
            const personFinnes = harPersonData(person);
            const personErMyndig = erMyndig(person);
            const personErMann = erMann(person);

            const personStateIsValid = personFinnes && personErMyndig && !personErMann;

            if (personStateIsValid) {
                return this.renderContent(this.getSøknadRoutes());
            }
            return this.renderContent(this.getErrorRoutes(personErMann, personFinnes));
        }
        return this.renderContent(this.getErrorRoutes(false, false));
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    soknad: state.apiReducer.soknad,
    isLoadingPerson: state.apiReducer.isLoadingPerson,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    language: state.commonReducer.language
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(AppContainer));
