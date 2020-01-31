import commonReducer, { CommonState } from './commonReducer';
import apiReducer, { ApiState } from './apiReducer';

interface MainState {
    commonReducer: CommonState;
    apiReducer: ApiState;
}

export type AppState = MainState;
export default { commonReducer, apiReducer };
