// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Hovedknapp,
    Fareknapp
} from 'nav-frontend-knapper';
import {
    incrementCounter,
    decrementCounter
} from '../../redux/ducks/Counter.duck';

type Props = {
    count: number,
    incrementCounter: Function,
    decrementCounter: Function
};

export const Counter = (props: Props) => (
    <div>
        <h2>Current value: {props.count}</h2>
        <Hovedknapp onClick={props.incrementCounter}>
            Increment
        </Hovedknapp>
        <Fareknapp onClick={props.decrementCounter}>
            Decrement
        </Fareknapp>
    </div>
);

const mapStateToProps = (state) => ({
    count: state.counterReducer.counter
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        incrementCounter,
        decrementCounter
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
