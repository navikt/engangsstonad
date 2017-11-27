import React from 'react';
import Counter from '../../components/counter';
import Home from './../../components/home/Home';

const routeConfig = [
    {
        path: '/',
        component: () => (<Counter />),
        exact: true

    },
    {
        path: '/test',
        component: () => (<Home />)
    }
];
export default routeConfig;
