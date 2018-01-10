import React from 'react';
import PropTypes from 'prop-types';
import renderChildRoutes from 'util/routing';
import StepBasedForm from 'shared/step-based-form/StepBasedForm';
import { connect } from 'react-redux';
import { getDataRequested } from './../../redux/ducks/Engangsstonad.duck';
import './engangsstonad.less';

// eslint-disable-next-line react/prefer-stateless-function
export class EngangsstonadIndex extends React.Component {
	componentWillMount() {
		this.props.dispatch(getDataRequested());
	}

	render() {
		return (
			<div className="engangsstonad">
				<StepBasedForm
					showStepper
					routes={renderChildRoutes(this.props.routes) || []}
					title="Søknad om engangsstønad"
					location={this.props.location}
				/>
				{this.props.data && <div>Data: {JSON.stringify(this.props.data)}</div>}
			</div>
		);
	}
}

EngangsstonadIndex.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	location: PropTypes.shape({}).isRequired,
	dispatch: PropTypes.func.isRequired,
	data: PropTypes.shape({})
};

EngangsstonadIndex.defaultProps = {
	data: null
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data
});

export default connect(mapStateToProps)(EngangsstonadIndex);
