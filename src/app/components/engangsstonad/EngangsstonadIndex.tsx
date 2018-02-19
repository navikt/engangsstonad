import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import * as queryStringParser from 'query-string';

import EngangsstonadConfirmation from 'components/engangsstonad/EngangsstonadConfirmation';
import EngangsstonadCompleted from 'components/engangsstonad/EngangsstonadCompleted';
import EngangsstonadContainer from 'components/engangsstonad/EngangsstonadContainer';
import EngangsstonadUnderAge from 'components/engangsstonad/EngangsstonadUnderAge';

import { apiActionCreators as api } from '../../redux/actions';
import { ExternalProps } from '../../types';

import './engangsstonad.less';
import { DispatchProps } from '../../redux/types';
import Person from '../../types/domain/Person';

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

    render() {
        return (
            <div className="engangsstonad">
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
                    path="/engangsstonad/:routeName"
                    component={EngangsstonadContainer}
                />
                <Redirect
                    to="/engangsstonad/confirmation"
                />
            </Switch>
        </div>
    );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person
});

export default withRouter(connect<StateProps, {}, {}>(mapStateToProps)(EngangsstonadIndex));
