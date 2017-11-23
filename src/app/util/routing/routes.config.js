import React from 'react';
import Test from '../../components/Test';

const routeConfig = [
    {
        path: '/',
        component: () => (<div>Hei</div>),
        title: 'Home',
        exact: true

    },
    {
        path: '/test',
        component: Test,
        title: 'Tests',
        exact: false
    }
];
export default routeConfig;
