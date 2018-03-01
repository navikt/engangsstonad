import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import * as queryStringParser from 'query-string';

import EngangsstonadConfirmation from 'components/engangsstonad/EngangsstonadConfirmation';
import EngangsstonadCompleted from 'components/engangsstonad/EngangsstonadCompleted';
import EngangsstonadUnderAge from 'components/engangsstonad/EngangsstonadUnderAge';
import SoknadWrapper from 'components/engangsstonad/SoknadWrapper';

import { apiActionCreators as api } from '../../redux/actions';
import { ExternalProps } from '../../types';

import './engangsstonad.less';
import { DispatchProps } from '../../redux/types';
import Person from '../../types/domain/Person';
import { erOver18ÅrSiden } from 'util/validation/validationUtils';

interface StateProps {
    person: Person;
}

type Props = StateProps & ExternalProps & DispatchProps & RouteComponentProps<{}>;
export class EngangsstonadIndex extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.getQueryParams = this.getQueryParams.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        const queryParams = this.getQueryParams();

        if (Object.keys(queryParams).length > 0) {
            dispatch(api.getPerson(queryParams));
        } else {
            dispatch(api.getPerson());
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
        const { person } = this.props;

        if (!person || !person.fødselsdato) {
            return this.renderContent(<div>No person found</div>);
        }

        if (person.kjønn === 'M') {
            return this.renderContent(<div>Fordi du er mann må du bla bla bla</div>);
        }

        if (!erOver18ÅrSiden(person.fødselsdato)) {
            this.props.history.push('/engangsstonad/underAge');
        }

        return this.renderContent(
            <Switch>
            <Route
                path="/engangsstonad/confirmation"
                component={EngangsstonadConfirmation}
            />
            <Route
                path="/engangsstonad/underAge"
                component={EngangsstonadUnderAge}
            />
            <Route
                path="/engangsstonad/completed"
                component={EngangsstonadCompleted}
            />
            <Route
                path="/engangsstonad/soknad"
                component={SoknadWrapper}
            />
            <Redirect
                to="/engangsstonad/confirmation"
            />
        </Switch>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(EngangsstonadIndex));
