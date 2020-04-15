import React from 'react';
import { useFormikContext } from 'formik';
import { FormProps } from 'app/engangsstonad/FormProps';

import { VisibilityContext } from './VisibilityContext';

export interface FormComponentProps {
    name: string;
    parent?: string;
}

const shouldRender = (visibleComponents: object, values: Partial<FormProps> , parent: string): boolean => {
    if (parent === 'NO_PARENT') {
        return true;
    }
    return values[parent] !== undefined && visibleComponents[parent] === true;
};


export function withGradualVisibility<T>(WrappedComponent: React.ComponentType<T & FormComponentProps>) {
    const VisibilityHoc: React.FunctionComponent<T & FormComponentProps> = ({
        name,
        parent = 'NO_PARENT',
        ...otherProps
    }) => {
        const { values } = useFormikContext<Partial<FormProps>>();
        const visibilityContext = React.useContext(VisibilityContext);
        return shouldRender(visibilityContext.visibleComponents!, values, parent) ? (
            <WrappedComponent name={name} parent={parent} {...(otherProps as T)} />
        ) : null;
    };
    return VisibilityHoc;
}
