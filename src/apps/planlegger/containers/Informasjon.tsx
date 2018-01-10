import * as React from 'react';

import DialogBox from '../../../app/components/shared/dialog-box/DialogBox';

export interface Props {}

export class Informasjon extends React.Component<Props, {}> {
	render() {
		return <DialogBox type="success">Velkommen</DialogBox>;
	}
}
export default Informasjon;
