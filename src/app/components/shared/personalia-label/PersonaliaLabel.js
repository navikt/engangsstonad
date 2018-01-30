import React from 'react';
import PropTypes from 'prop-types';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import CustomSVG from 'shared/custom-svg/CustomSVG';
import svg from 'assets/svg/icon_female.svg';

import './personaliaLabel.less';

const PersonaliaLabel = ({ navn, personnummer }) => (
	<div className="personaliaLabel">
		<CustomSVG className="personaliaLabel__icon" iconRef={svg} size={32} />
		<div className="personaliaLabel__right">
			<Undertittel className="personaliaLabel__name">{navn}</Undertittel>
			<Normaltekst className="personaliaLabel__person">
				{personnummer}
			</Normaltekst>
		</div>
	</div>
);

PersonaliaLabel.propTypes = {
	navn: PropTypes.string,
	personnummer: PropTypes.string
};

PersonaliaLabel.defaultProps = {
	navn: PropTypes.string,
	personnummer: PropTypes.string
};

export default PersonaliaLabel;
