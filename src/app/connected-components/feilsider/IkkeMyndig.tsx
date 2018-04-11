import * as React from 'react';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Ingress } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import HeaderIllustration, {
    Theme
} from 'components/header-illustration/HeaderIllustration';
import getMessage from '../../util/i18n/i18nUtils';
import Person from '../../types/domain/Person';

import '../../styles/engangsstonad.less';

const VelkommenIllustration = require('assets/svg/frontpage.svg').default;

interface StateProps {
    person: Person;
}

type Props = StateProps & InjectedIntlProps;

export const IkkeMyndig: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <div className="responsiveContainer">
                <DocumentTitle title="Kvittering - NAV Engangsstønad" />
                <HeaderIllustration
                    dialog={{
                        title: getMessage(
                            intl,
                            'intro.snakkeboble.overskrift',
                            {
                                name: props.person.fornavn
                            }
                        ),
                        text: getMessage(intl, 'intro.text.under18')
                    }}
                    title={getMessage(intl, 'søknad.pageheading')}
                    svg={VelkommenIllustration}
                    theme={Theme.orange}
                />
                <Ingress>
                    {intl.formatMessage({ id: 'intro.text.omES' })}
                </Ingress>
                <Lenke
                    className="paperVersionLink"
                    href="https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=267390&veiledertype=privatperson&method=mail"
                    target="_blank"
                >
                    {getMessage(intl, 'intro.text.lastNedPapirsoknad')}
                </Lenke>
            </div>
        );
    }
    return null;
};

// tslint:disable-next-line no-any
const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person
});

export default connect(mapStateToProps)(injectIntl(IkkeMyndig));
