const COUNT_INCREMENT = 'COUNT_INCREMENT';
const COUNT_DECREMENT = 'COUNT_DECREMENT';

export const incrementCounter = () => ({ type: COUNT_INCREMENT });
export const decrementCounter = () => ({ type: COUNT_DECREMENT });

const counterReducer = (state = { counter: 0 }, action) => {
    switch (action.type) {
        case COUNT_INCREMENT:
            return { ...state, counter: state.counter + 1 };
        case COUNT_DECREMENT:
            return { ...state, counter: state.counter - 1 };
        default:
            return state;
    }
};

export default counterReducer;
