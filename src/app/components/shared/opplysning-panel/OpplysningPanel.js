import React from "react";
import PropTypes from "prop-types";
import DisplayTextWithLabel from "../display-text-with-label/DisplayTextWithLabel";
import IconWithText from "../icon-with-text/IconWithText";
import "./opplysningpanel.less";

const OpplysningPanel = (props) => (
	<div className="opplysningPanel">
		<IconWithText kind={props.iconKind} text={props.title} />
		{props.opplysningData.map((opplysninger, index) => (
			<DisplayTextWithLabel
				// eslint-disable-next-line react/no-array-index-key
				key={opplysninger.text + index}
				{...opplysninger}
			/>
		))}
	</div>
);

OpplysningPanel.propTypes = {
	iconKind: PropTypes.string.isRequired,
	opplysningData: PropTypes.arrayOf(PropTypes.object).isRequired,
	title: PropTypes.string
};

OpplysningPanel.defaultProps = {
	title: ""
};

export default OpplysningPanel;
