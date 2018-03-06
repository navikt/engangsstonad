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

import { apiActionCreators as api } from '../redux/actions';
import { ExternalProps } from '../types';

import { DispatchProps } from '../redux/types';
import Person from '../types/domain/Person';

import '../styles/engangsstonad.less';
import { erMann, erMyndig, harPersonData } from 'util/validation/validationUtils';

interface StateProps {
    person: Person;
    isLoadingPerson: boolean;
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

    getInvalidPersonRoutes(personErMann: boolean, personFinnes: boolean) {
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

    getValidPersonRoutes() {
        return (
            <Switch>
                <Route path="/engangsstonad" component={Intro} exact={true} />,
                <Route path="/engangsstonad/completed" component={SøknadSendt} />,
                <Route path="/engangsstonad/soknad" component={SøknadContainer} />,
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
                return this.renderContent(this.getValidPersonRoutes());
            }
            return this.renderContent(this.getInvalidPersonRoutes(personErMann, personFinnes));
        }
        return this.renderContent(this.getInvalidPersonRoutes(false, false));
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    isLoadingPerson: state.apiReducer.isLoadingPerson
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(AppContainer));
