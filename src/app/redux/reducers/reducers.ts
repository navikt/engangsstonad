import EngangsstonadSoknad from 'app/types/domain/EngangsstonadSoknad';
import commonReducer, { CommonState } from './commonReducer';
import apiReducer, { ApiState } from './apiReducer';
import stepReducer, { StepState } from './stepReducer';
import soknadReducer from './soknadReducer';

interface MainState {
    soknadReducer: EngangsstonadSoknad;
    commonReducer: CommonState;
    apiReducer: ApiState;
    stepReducer: StepState;
}

export type AppState = MainState;
export default { soknadReducer, commonReducer, apiReducer, stepReducer };
