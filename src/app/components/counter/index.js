// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Hovedknapp,
    Fareknapp
} from 'nav-frontend-knapper';
import {
    incrementCounter,
    decrementCounter
} from '../../redux/ducks/Counter.ducks';

type Props = {
    count: number,
    dispatch: Function
};

class Counter extends Component<Props> {
    incrementCounter() {
        this.props.dispatch(incrementCounter());
    }

    decrementCounter() {
        this.props.dispatch(decrementCounter());
    }

    render() {
        return (
            <div>
                <h2>Current value: {this.props.count}</h2>
                <Hovedknapp onClick={() => this.incrementCounter()}>
                    Increment
                </Hovedknapp>
                <Fareknapp onClick={() => this.decrementCounter()}>
                    Decrement
                </Fareknapp>
            </div>
        );
    }
}

// eslint-disable-next-line no-class-assign
Counter = connect((state) => ({
    count: state.counterReducer.counter
}))(Counter);

export default Counter;
