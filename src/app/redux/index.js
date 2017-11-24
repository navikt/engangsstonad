import {
    combineReducers,
    createStore
} from 'redux';
import counterReducer from './ducks/Counter.duck';

const reducers = combineReducers({ counterReducer });
const store = createStore(reducers);

export default store;
