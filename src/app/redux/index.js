import { combineReducers, createStore } from "redux";
import engangsstonadReducer, { sagas } from "./ducks/Engangsstonad.duck";
import middleware, { sagaMiddleware } from "./middleware";

const reducers = combineReducers({ engangsstonadReducer });

const store = createStore(
	reducers,
	// eslint-disable-next-line no-underscore-dangle
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	middleware
);

sagaMiddleware.run(sagas);

export default store;
