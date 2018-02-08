import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryStringParser from 'query-string';

import EngangsstonadConfirmation from 'components/engangsstonad/EngangsstonadConfirmation';
import EngangsstonadCompleted from 'components/engangsstonad/EngangsstonadCompleted';
import EngangsstonadContainer from 'components/engangsstonad/EngangsstonadContainer';
import EngangsstonadUnderAge from 'components/engangsstonad/EngangsstonadUnderAge';

import { getDataRequested } from '../../redux/actions/actions';

import './engangsstonad.less';

export class EngangsstonadIndex extends Component {
	constructor(props) {
		super(props);

		this.getQueryParams = this.getQueryParams.bind(this);
	}

	componentWillMount() {
		const queryParams = this.getQueryParams();

		if (Object.keys(queryParams).length > 0) {
			this.props.dispatch(getDataRequested(queryParams));
		} else {
			this.props.dispatch(getDataRequested());
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
	data: state.engangsstonadReducer.data
});

export default withRouter(connect(mapStateToProps)(EngangsstonadIndex));
