import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';

const { Ingress } = require('nav-frontend-typografi');
import { Hovedknapp } from 'nav-frontend-knapper';
import HeaderIllustration, { Theme } from 'shared/header-illustration/HeaderIllustration';
const VelkommenIllustration = require('assets/svg/frontpage.svg').default;
import getMessage from '../../util/i18n/i18nUtils';

import './engangsstonad.less';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Person from '../../types/domain/Person';
import { erOver18ÅrSiden } from 'util/validation/validationUtils';
import { ExternalProps } from '../../types/index';

interface StateProps {
    person: Person;
}

type Props = StateProps & InjectedIntlProps & ExternalProps;

export const EngangsstonadUnderAge: React.StatelessComponent<Props> = (props: Props) => {
    const { history, intl, person } = props;

    if (person && erOver18ÅrSiden(person.fødselsdato)) {
        history.push('/engangsstonad/confirmation');
    } else if (person) {
        return (
            <div className="engangsstonad">
                <DocumentTitle title="Kvittering - NAV Engangsstønad" />
                <HeaderIllustration
                    dialog={{
                        title: getMessage(intl, 'kvittering.snakkeboble.overskrift', {
                            name: props.person.fornavn
                        }),
                        text: getMessage(intl, 'intro.text.under18')
                    }}
                    title={getMessage(intl, 'intro.pageheading.soknadES')}
                    svg={VelkommenIllustration}
                    theme={Theme.orange}
                />
                <Ingress>{intl.formatMessage({ id: 'intro.text.omES' })}</Ingress>
                <a
                    className="paperVersionLink"
                    href="#"
                >
                    {getMessage(intl, 'intro.text.lastNedPapirsoknad')}
                </a>
                <div className="engangsstonad__centerButton">
                    <Hovedknapp>
                        {intl.formatMessage({ id: 'kvittering.text.lukkVinduet' })}
                    </Hovedknapp>
                </div>
            </div>
        );
    }
    return null;
};

// tslint:disable-next-line no-any
const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
});

export default connect(mapStateToProps)(injectIntl(EngangsstonadUnderAge));
