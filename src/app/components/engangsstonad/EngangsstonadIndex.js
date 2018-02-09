import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryStringParser from 'query-string';

import EngangsstonadConfirmation from 'components/engangsstonad/EngangsstonadConfirmation';
import EngangsstonadCompleted from 'components/engangsstonad/EngangsstonadCompleted';
import EngangsstonadContainer from 'components/engangsstonad/EngangsstonadContainer';
import EngangsstonadUnderAge from 'components/engangsstonad/EngangsstonadUnderAge';

import { apiActionCreators as api } from '../../redux/actions';

import './engangsstonad.less';

export class EngangsstonadIndex extends Component {
	constructor(props) {
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
						component={EngangsstonadConfirmation}
					/>
				</Switch>
			</div>
		);
	}
}

EngangsstonadIndex.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string,
		search: PropTypes.string
	}).isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	person: state.apiReducer.person
});

export default withRouter(connect(mapStateToProps)(EngangsstonadIndex));
