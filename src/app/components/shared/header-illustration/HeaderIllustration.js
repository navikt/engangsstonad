import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Sidetittel } from 'nav-frontend-typografi';

import CustomSVG from '../custom-svg/CustomSVG';
import SpeechBubble from '../speech-bubble/SpeechBubble';

import './headerIllustration.less';

const HeaderIllustration = ({ title, dialog, svg, theme }) => (
	<div className={`headerIllustration headerIllustration--${theme}`}>
		<div className="headerIllustration__title">
			<Sidetittel>{title}</Sidetittel>
		</div>
		{dialog && (
			<div className="headerIllustration__speechBubble">
				<SpeechBubble title={dialog.title} text={dialog.text} theme={theme} />
			</div>
		)}
		<div className="headerIllustration__illustration">
			<CustomSVG iconRef={svg} />
		</div>
	</div>
);

HeaderIllustration.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	dialog: PropTypes.shape({
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
	}),
	svg: PropTypes.object,
	theme: PropTypes.oneOf(['purple', 'green'])
};

HeaderIllustration.defaultProps = {
	dialog: null,
	svg: null,
	theme: 'purple'
};

export default HeaderIllustration;
