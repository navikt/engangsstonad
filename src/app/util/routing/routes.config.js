import React from 'react';
import Counter from '../../components/counter';

const routeConfig = [
    {
        path: '/',
        component: () => (<Counter />),
        exact: true

    },
    {
        path: '/test',
        component: () => (<div>test</div>)
    }
];
export default routeConfig;
