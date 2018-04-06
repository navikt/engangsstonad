import * as React from 'react';
import * as classnames from 'classnames';
import { KalenderPlassering } from '../types';

export interface Props {
    plassering: KalenderPlassering;
}

const KalenderPortal: React.StatelessComponent<Props> = ({ plassering, children }) => (
    <div className={classnames('nav-datovelger__kalenderPortal', `nav-datovelger__kalenderPortal--${plassering}`)}>
        <div className="nav-datovelger__kalenderPortal__content">{children}</div>
    </div>
);

export default KalenderPortal;
