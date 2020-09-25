import { combineReducers, createStore, compose } from 'redux';
import reducers from './reducers/reducers';
import rootSaga from './sagas/rootSaga';
import middleware, { sagaMiddleware } from './middleware';
const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancer(middleware));
sagaMiddleware.run(rootSaga);
export default store;
