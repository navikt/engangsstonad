import * as React from 'react';
import './labeltext.less';

export interface Props {
    children: React.ReactNode;
}

const LabelText: React.StatelessComponent<Props> = ({ children }) => <span className="labeltext">{children}</span>;

export default LabelText;
