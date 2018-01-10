import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Element } from 'nav-frontend-typografi';

import './speechBubble.less';

const SpeechBubble = ({ title, text }) => (
	<div className="speechBubble">
		<div className="speechBubble__content">
			{title && (
				<div className="speechBubble__title">
					<Element className="m_no-margin">{title}</Element>
				</div>
			)}
			<div className="speechBubble__text">{text}</div>
		</div>
	</div>
);

SpeechBubble.propTypes = {
	title: PropTypes.string,
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

SpeechBubble.defaultProps = {
	title: null
};

export default SpeechBubble;
