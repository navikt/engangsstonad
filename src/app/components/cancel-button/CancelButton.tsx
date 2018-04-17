import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Link, Route } from 'react-router-dom';
import Knapp from 'nav-frontend-knapper';
import Redirect from 'components/redirect/Redirect';
import './cancelButton.less';
import getMessage from 'util/i18n/i18nUtils';

interface Props {
    redirect: string;
}

const CancelButton: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, redirect }) => {
    return (
        <div className="cancelButtonWrapper">
            <Route
                path="/engangsstonad/soknad/cancel"
                component={() => <Redirect loc={redirect} />}
            />
            <Link
                tabIndex={-1}
                to="/engangsstonad/soknad/cancel"
            >
                <Knapp className="cancelButton" type="standard" htmlType="button">
                    {getMessage(intl, 'standard.avbrytSøknad')}
                </Knapp>
            </Link>
        </div>
    );
};
export default injectIntl(CancelButton);
