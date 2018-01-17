import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Tidslinje from './tidslinje/Tidslinje';
import DialogBox from 'shared/dialog-box/DialogBox';

import './workbench.less';

const basePath = '/workbench';

const paths = {
	tidslinje: `${basePath}/tidslinje`
};

const Workbench: React.StatelessComponent<{}> = () => (
	<div className="workbench">
		<h1>Workbench</h1>
		<Switch>
			<Route
				path={basePath}
				exact={true}
				render={() => (
					<DialogBox type="success">
						<p>Velg komponent:</p>
						<Link to={paths.tidslinje}>Tidslinje</Link>
					</DialogBox>
				)}
			/>
			<Route path={paths.tidslinje} component={Tidslinje} exact={true} />
		</Switch>
	</div>
);

export default Workbench;
