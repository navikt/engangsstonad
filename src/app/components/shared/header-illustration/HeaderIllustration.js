import * as React from 'react';
import * as PropTypes from 'prop-types';

import CustomSVG from '../custom-svg/CustomSVG';
import './headerIllustration.less';

import SpeechBubble from '../speech-bubble/SpeechBubble';

const HeaderIllustration = ({ dialog, svg }) => (
	<div className="headerIllustration m-overflow-horizontal">
		<div className="headerIllustration__speechBubble">
			<SpeechBubble title={dialog.title} text={dialog.text} />
		</div>
		<div className="headerIllustration__illustration">
			<CustomSVG iconRef={svg} />
		</div>
	</div>
);

HeaderIllustration.propTypes = {
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
