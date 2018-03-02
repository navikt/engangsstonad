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

    renderContent(content: React.ReactNode) {
        return (
            <div className="engangsstonad">
                {content}
            </div>
        );
    }

    render() {
        return this.renderContent(
            <Switch>
            <Route path="/engangsstonad/confirmation" component={Intro} />
            <Route path="/engangsstonad/underAge" component={IkkeMyndig} />
            <Route path="/engangsstonad/erMann" component={ErMann} />
            <Route path="/engangsstonad/personFinnesIkke" component={PersonFinnesIkke} />
            <Route path="/engangsstonad/completed" component={SøknadSendt} />
            <Route path="/engangsstonad/soknad" component={SøknadContainer} />
            <Redirect to="/engangsstonad/confirmation" />
        </Switch>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(AppContainer));
