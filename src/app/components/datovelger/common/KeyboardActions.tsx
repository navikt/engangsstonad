import * as React from 'react';
import DomEventContainer from './DomEventContainer';

export type NavigationKeys = 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'End' | 'Home' | 'PageDown' | 'PageUp';
export type WhitespaceKeys = 'Tab' | 'Enter';
export type ModifierKeys = 'Alt' | 'CapsLock' | 'Control' | 'Fn' | 'Shift';
export type UIKeys = 'Escape' | 'Cancel';

export type KeyType = NavigationKeys | WhitespaceKeys | ModifierKeys | UIKeys;

export interface KeyboardAction {
    name: string;
    key: KeyType;
    onAction: (evt: React.KeyboardEvent<any>) => void;
    shiftKey?: boolean;
    altKey?: boolean;
    ctrlKey?: boolean;
}

export interface Props {
    actions: KeyboardAction[];
}

const getAction = (evt: React.KeyboardEvent<any>, actions: KeyboardAction[]): KeyboardAction | undefined => {
    return actions.find(action => {
        if (evt.altKey) {
            return evt.key === action.key && action.altKey === true;
        }
        return evt.key === action.key;
    });
};

export class KeyboardActions extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(evt: React.KeyboardEvent<any>) {
        const action = getAction(evt, this.props.actions);
        if (action) {
            action.onAction(evt);
        }
    }

    render() {
        return <DomEventContainer onKeyDown={this.onKeyDown}>{this.props.children}</DomEventContainer>;
    }
}
export default KeyboardActions;
