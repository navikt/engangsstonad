import { combineReducers, createStore } from 'redux';
import soknadReducer from './reducers/soknadReducer';
import commonReducer from './reducers/commonReducer';
import apiReducer from './reducers/apiReducer';
import sagas from './sagas/sagas';
import middleware, { sagaMiddleware } from './middleware';
import stepReducer from 'reducers/stepReducer';
import attachmentReducer from '../../storage/attachment/redux/attachmentReducer';

const reducers = combineReducers({ soknadReducer, commonReducer, apiReducer, stepReducer, attachmentReducer });

const store = createStore(
    reducers,
    // tslint:disable-next-line no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);

sagaMiddleware.run(sagas);

export default store;
