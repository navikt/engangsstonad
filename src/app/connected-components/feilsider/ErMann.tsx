import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';

const { Ingress } = require('nav-frontend-typografi');
import { Hovedknapp } from 'nav-frontend-knapper';
import HeaderIllustration, { Theme } from 'components/header-illustration/HeaderIllustration';
const VelkommenIllustration = require('assets/svg/frontpage.svg').default;
import getMessage from '../../util/i18n/i18nUtils';

import '../../styles/engangsstonad.less';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Person from '../../types/domain/Person';

interface StateProps {
    person: Person;
}

type Props = StateProps & InjectedIntlProps;

export const ErMann: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <div className="responsiveContainer">
                <DocumentTitle title="Kvittering - NAV Engangsstønad" />
                <HeaderIllustration
                    dialog={{
                        title: getMessage(intl, 'intro.snakkeboble.overskrift', { name: props.person.fornavn }),
                        text: getMessage(intl, 'intro.text.erMann')
                    }}
                    title={getMessage(intl, 'søknad.pageheading')}
                    svg={VelkommenIllustration}
                    theme={Theme.red}
                />
                <Ingress>{intl.formatMessage({ id: 'intro.text.omES' })}</Ingress>
                <a
                    className="paperVersionLink"
                    href="https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=267390&veiledertype=privatperson&method=mail"
                    target="_blank"
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

export default connect(mapStateToProps)(injectIntl(ErMann));
