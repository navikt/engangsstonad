import { combineReducers, createStore } from 'redux';
<<<<<<< HEAD
import counterReducer from './ducks/Counter.duck';
import engangsstonadReducer from './ducks/Engangsstonad.duck';
import dateReducer from './ducks/Date.duck';

const reducers = combineReducers({ counterReducer, engangsstonadReducer, dateReducer });
=======
import engangsstonadReducer, { sagas } from './ducks/Engangsstonad.duck';
import middleware, { sagaMiddleware } from './middleware';

const reducers = combineReducers({ engangsstonadReducer });
>>>>>>> a50c15abc2d027d4ec49c0880482347b329fbb70

const store = createStore(
    reducers,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);

sagaMiddleware.run(sagas);

export default store;
