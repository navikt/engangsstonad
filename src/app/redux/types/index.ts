// tslint:disable-next-line no-any
import EngangsstonadSoknad from '../../types/domain/EngangsstonadSoknad';
import { CommonState } from 'reducers/commonReducer';
import { StepState } from 'reducers/stepReducer';

export type Dispatch = (action: any) => any;

export interface DispatchProps {
    dispatch: Dispatch;
}

export interface AppState {
    søknad: EngangsstonadSoknad;
    common: CommonState;
    step: StepState;
}
