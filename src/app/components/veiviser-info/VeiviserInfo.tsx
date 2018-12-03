import * as React from 'react';
import * as classnames from 'classnames';

import Veiviser from 'components/veiviser/VeiviserSvg';

import './veiviserinfo.less';

const VeiviserInfo: React.StatelessComponent = ({ children }) => {
    return (
        <div className={classnames('veiviserinfo')}>
            <span
                className="veiviserinfo__veiviser"
                role="presentation"
                aria-hidden={true}
            >
                <Veiviser />
            </span>

            <div className={classnames('veiviserinfo__innhold', 'typo-normal')}>
                {children}
            </div>
        </div>
    );
};

export default VeiviserInfo;
