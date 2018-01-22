import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Element } from 'nav-frontend-typografi';

import './speechBubble.less';

const SpeechBubble = ({ title, text, theme }) => (
	<div className={`speechBubble speechBubble--${theme}`}>
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
	text: PropTypes.string.isRequired,
	theme: PropTypes.oneOf(['purple', 'green'])
};

SpeechBubble.defaultProps = {
	title: null,
	theme: 'purple'
};

export default SpeechBubble;
