import { combineReducers, createStore } from 'redux';
import soknadReducer from './reducers/soknadReducer';
import commonReducer from './reducers/commonReducer';
import apiReducer from './reducers/apiReducer';
import rootSaga from './sagas/rootSaga';
import middleware, { sagaMiddleware } from './middleware';
import stepReducer from 'reducers/stepReducer';

const reducers = combineReducers({ soknadReducer, commonReducer, apiReducer, stepReducer });

const store = createStore(
    reducers,
    // tslint:disable-next-line no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);

sagaMiddleware.run(rootSaga);

export default store;
