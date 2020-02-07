import { createStore } from 'redux';
import rootreducer from './reducers';
import rootSaga from './sagas/rootSaga';
import middleware, { sagaMiddleware } from './middleware';

const store = createStore(
    rootreducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
    console.log(rootreducer);
    module.hot.accept('./reducers', () => store.replaceReducer(rootreducer))
  }

sagaMiddleware.run(rootSaga);

export default store;
