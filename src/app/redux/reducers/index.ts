import commonReducer, { CommonState } from './commonReducer';
import apiReducer, { ApiState } from './apiReducer';
import { combineReducers } from 'redux';

interface MainState {
    commonReducer: CommonState;
    apiReducer: ApiState;
}

export type AppState = MainState;
export default combineReducers({ commonReducer, apiReducer });
