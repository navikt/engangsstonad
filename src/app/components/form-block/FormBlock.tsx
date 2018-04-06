import * as React from 'react';
import { Collapse } from 'react-collapse';

export interface Props {
    children: React.ReactNode;
    /** Default true */
    visible?: boolean;
    /** Default false */
    animated?: boolean;
}

import './formblock.less';

const FormBlock: React.StatelessComponent<Props> = ({ visible = true, animated = false, children }) => {
    const getContent = () => <div className="formblock">{children}</div>;

    if (animated === true) {
        return <Collapse isOpened={visible === true}>{visible ? getContent() : <div />}</Collapse>;
    }
    if (!visible) {
        return null;
    }
    return getContent();
};

export default FormBlock;
