import * as React from 'react';
import { Collapse } from 'react-collapse';
import * as classnames from 'classnames';

export type BottomMargin = 'm' | 's' | 'xs' | 'xxs';

export interface Props {
    children: React.ReactNode;
    /** Default true */
    visible?: boolean;
    /** Default true */
    animated?: boolean;
    /** Size - default m */
    margin?: BottomMargin;
}

import './formblock.less';

const FormBlock: React.StatelessComponent<Props> = ({
    visible = true,
    animated = true,
    margin = 'm',
    children
}) => {
    const getContent = () => (
        <div className={classnames('formblock', `formblock--${margin}`)}>{children}</div>
    );

    if (animated === true && margin === 'm') {
        return (
            <Collapse isOpened={visible === true} className="formblock__collapse">
                {visible ? getContent() : <div />}
            </Collapse>
        );
    }
    if (!visible) {
        return null;
    }
    return getContent();
};

export default FormBlock;
