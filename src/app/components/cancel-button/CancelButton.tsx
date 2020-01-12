import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import './cancelButton.less';

interface Props {
    redirect: string;
}

const CancelButton: React.StatelessComponent<Props> = () => {
    return (
        <div className="cancelButtonWrapper">
            <Link className="cancelButton" to="/engangsstonad/soknad/cancel">
                <FormattedMessage id="standard.avbrytSøknad"/>
            </Link>
        </div>
    );
};
export default CancelButton;
