import * as React from 'react';
import { KeyboardActions, KeyboardAction } from './KeyboardActions';

export type KeyboarActionEvent = (evt: React.KeyboardEvent<any>) => void;

export interface Props {
    onEnter?: KeyboarActionEvent;
    onEscape?: KeyboarActionEvent;
    onArrowUp?: KeyboarActionEvent;
    onArrowDown?: KeyboarActionEvent;
    onArrowLeft?: KeyboarActionEvent;
    onArrowRight?: KeyboarActionEvent;
    onPageDown?: KeyboarActionEvent;
    onPageUp?: KeyboarActionEvent;
    onAltPageDown?: KeyboarActionEvent;
    onAltPageUp?: KeyboarActionEvent;
    onHome?: KeyboarActionEvent;
    onEnd?: KeyboarActionEvent;
}

const enterAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'enter',
    key: 'Enter',
    onAction
});
const escapeAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'escape',
    key: 'Escape',
    onAction
});
const arrowUpAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'arrowUp',
    key: 'ArrowUp',
    onAction
});
const arrowDownAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'arrowUp',
    key: 'ArrowUp',
    onAction
});
const arrowLeftAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'arrowLeft',
    key: 'ArrowLeft',
    onAction
});
const arrowRightAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'arrowRight',
    key: 'ArrowRight',
    onAction
});
const pageUpAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'pageUp',
    key: 'PageUp',
    onAction
});
const pageDownAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'pageDown',
    key: 'PageDown',
    onAction
});
const altPageUpAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'altPageUp',
    key: 'PageUp',
    altKey: true,
    onAction
});
const altPageDownAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'altPageDown',
    key: 'PageDown',
    altKey: true,
    onAction
});
const homeAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'home',
    key: 'Home',
    onAction
});
const endAction = (onAction: KeyboarActionEvent): KeyboardAction => ({
    name: 'end',
    key: 'End',
    onAction
});

const KeyboardNavigation: React.StatelessComponent<Props> = props => (
    <KeyboardActions
        actions={[
            ...(props.onEnter ? [enterAction(props.onEnter)] : []),
            ...(props.onEscape ? [escapeAction(props.onEscape)] : []),
            ...(props.onArrowUp ? [arrowUpAction(props.onArrowUp)] : []),
            ...(props.onArrowDown ? [arrowDownAction(props.onArrowDown)] : []),
            ...(props.onArrowLeft ? [arrowLeftAction(props.onArrowLeft)] : []),
            ...(props.onArrowRight ? [arrowRightAction(props.onArrowRight)] : []),
            ...(props.onPageUp ? [pageUpAction(props.onPageUp)] : []),
            ...(props.onPageDown ? [pageDownAction(props.onPageDown)] : []),
            ...(props.onAltPageUp ? [altPageUpAction(props.onAltPageUp)] : []),
            ...(props.onAltPageDown ? [altPageDownAction(props.onAltPageDown)] : []),
            ...(props.onHome ? [homeAction(props.onHome)] : []),
            ...(props.onEnd ? [endAction(props.onEnd)] : [])
        ]}
    >
        {props.children}
    </KeyboardActions>
);

export default KeyboardNavigation;
