import React from 'react';
import { useFormikContext } from 'formik';
import { shouldRender } from '../utils';

export interface FormComponentProps {
    name: string;
    parent?: string;
}

export function withGradualVisibility<T>(WrappedComponent: React.ComponentType<T & FormComponentProps>) {
    const VisibilityHoc: React.FunctionComponent<T & FormComponentProps> = ({
        name,
        parent = 'NO_PARENT',
        ...otherProps
    }) => {
        const formik = useFormikContext<Partial<FormData>>();
        if (!shouldRender(formik, parent)) {
            return null;
        }
        return <WrappedComponent name={name} parent={parent} {...(otherProps as T)} />;
    };
    return VisibilityHoc;
}
