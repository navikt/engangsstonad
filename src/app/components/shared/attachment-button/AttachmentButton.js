import React from "react";
import { Knapp } from "nav-frontend-knapper";
import Icon from "nav-frontend-ikoner-assets";

const AttachmentButton = () => (
	<Knapp htmlType="button">
		<label htmlFor="files">
			<input id="files" className="hidden" type="file" />
			Last opp vedlegg
		</label>
		<Icon kind="vedlegg" size="15px" />
	</Knapp>
);
export default AttachmentButton;
