import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux';
import Counter from './components/counter';

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Counter />
    </Provider>,
    root
);
