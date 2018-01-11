import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Sidetittel } from 'nav-frontend-typografi';

import CustomSVG from '../custom-svg/CustomSVG';
import './headerIllustration.less';

import SpeechBubble from '../speech-bubble/SpeechBubble';

const HeaderIllustration = ({ title, dialog, svg }) => (
	<div className="headerIllustration">
		<div className="headerIllustration__title">
			<Sidetittel>{title}</Sidetittel>
		</div>
		<div className="headerIllustration__speechBubble">
			<SpeechBubble title={dialog.title} text={dialog.text} />
		</div>
		<div className="headerIllustration__illustration">
			<CustomSVG iconRef={svg} />
		</div>
	</div>
);

HeaderIllustration.propTypes = {
	title: PropTypes.string.isRequired,
	dialog: PropTypes.shape({
		title: PropTypes.string
	}),
	svg: PropTypes.object
};

HeaderIllustration.defaultProps = {
	dialog: null,
	svg: null
};

export default HeaderIllustration;
