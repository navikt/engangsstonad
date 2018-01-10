import React from 'react';
import PropTypes from 'prop-types';
import renderChildRoutes from 'util/routing';
import StepBasedForm from 'shared/step-based-form/StepBasedForm';
import { connect } from 'react-redux';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import { getDataRequested } from './../../redux/ducks/Engangsstonad.duck';
import './engangsstonad.less';

import VelkommenIllustration from '../../assets/svg/frontpage.svg';

export class EngangsstonadIndex extends React.Component {
	componentWillMount() {
		this.props.dispatch(getDataRequested());
	}

	render() {
		const title = 'Søknad om engangsstønad';
		return (
			<div className="engangsstonad">
				<StepBasedForm
					nextButtonEnabled
					routes={renderChildRoutes(this.props.routes) || []}
					title={title}
					location={this.props.location}
					illustrations={{
						'0': (
							<HeaderIllustration
								dialog={{
									title: 'Hei Lise',
									text:
										'Jeg skal veilede deg gjennom søknaden. Vi har tre steg vi skal gjennom.'
								}}
								title={title}
								svg={VelkommenIllustration}
							/>
						)
					}}
				/>
				{this.props.data && <div>Data: {JSON.stringify(this.props.data)}</div>}
				{this.props.error && (
					<div>Error getting data: {JSON.stringify(this.props.error)}</div>
				)}
			</div>
		);
	}
}

EngangsstonadIndex.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	location: PropTypes.shape({}).isRequired,
	dispatch: PropTypes.func.isRequired,
	data: PropTypes.shape({}),
	error: PropTypes.shape({})
};

EngangsstonadIndex.defaultProps = {
	data: null,
	error: null
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	error: state.engangsstonadReducer.error
});

export default connect(mapStateToProps)(EngangsstonadIndex);
