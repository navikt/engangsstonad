// tslint:disable-next-line no-any
import { CommonState } from 'reducers/commonReducer';
import { StepState } from 'reducers/stepReducer';
import EngangsstonadSoknad from '../../../app/types/domain/EngangsstonadSoknad';

export type Dispatch = (action: any) => any;

export interface DispatchProps {
    dispatch: Dispatch;
}

export interface AppState {
    søknad: EngangsstonadSoknad;
    common: CommonState;
    step: StepState;
}
