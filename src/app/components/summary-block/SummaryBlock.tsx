import * as React from 'react';
import { Ingress } from 'nav-frontend-typografi';

import './summaryBlock.less';

export interface Props {
    title: string;
    children: React.ReactNode;
}

const SummaryBlock: React.StatelessComponent<Props> = ({ children, title }) => (
    <div className="summaryBlock">
        <Ingress className="summaryBlock__title">{title}</Ingress>
        {children}
    </div>
);

export default SummaryBlock;
