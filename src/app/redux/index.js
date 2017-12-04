import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import counterReducer from './ducks/Counter.duck';

const reducers = combineReducers({
    counterReducer,
    form: formReducer
});

const store = createStore(reducers);

export default store;
