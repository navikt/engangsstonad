import * as React from 'react';
import './labeltekst.less';

export interface Props {
    children: React.ReactNode;
}

const Labeltekst: React.StatelessComponent<Props> = ({ children }) => <span className="labeltekst">{children}</span>;

export default Labeltekst;
