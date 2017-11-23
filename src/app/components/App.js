// @flow
/* eslint-disable */

import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../util/routing/routes';

const App = () => (
    <Switch>
        {routes()}
    </Switch>
);
export default App;
