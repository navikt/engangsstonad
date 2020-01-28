import commonReducer, { CommonState } from './commonReducer';
import apiReducer, { ApiState } from './apiReducer';
import stepReducer, { StepState } from './stepReducer';

interface MainState {
    commonReducer: CommonState;
    apiReducer: ApiState;
    stepReducer: StepState;
}

export type AppState = MainState;
export default { commonReducer, apiReducer, stepReducer };
