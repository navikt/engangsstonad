import React from 'react';
import Counter from '../../components/counter';

const routeConfig = [
    {
        path: '/',
        component: () => (<Counter />),
        exact: true

    }
];
export default routeConfig;
