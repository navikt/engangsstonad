import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import * as queryStringParser from 'query-string';

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
                <Switch>
                    {children}
                </Switch>
            </div>
        );
    }

    getInvalidPersonRoutes(personErMann: boolean, personFinnes: boolean) {
        let route: any = {};
        if (personErMann) {
            route = { component: ErMann, subpath: 'erMann'};
        } else if (!personFinnes) {
            route = { component: PersonFinnesIkke, subpath: 'personFinnesIkke'};
        } else {
            route = { component: IkkeMyndig, subpath: 'underAge'};
        }
        return [
            <Route path={`/engangsstonad/${route.subpath}`} component={route.component} key={route.subpath} />,
            <Redirect to={`/engangsstonad/${route.subpath}`} key={`redirect${route.subpath}`} />
        ];
    }

    getValidPersonRoutes() {
        return [
            <Route path="/engangsstonad/confirmation" component={Intro} key="confirmation" />,
            <Route path="/engangsstonad/completed" component={SøknadSendt} key="completed" />,
            <Route path="/engangsstonad/soknad" component={SøknadContainer} key="soknad" />,
            <Redirect to="/engangsstonad/confirmation" key="confirmation" />
        ];
    }

    render() {
        const { person } = this.props;

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
    person: state.apiReducer.person
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(AppContainer));
