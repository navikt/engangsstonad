import * as React from 'react';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Ingress } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import LanguageToggle from '../../intl/LanguageToggle';
const VeilederIllustration = require('assets/svg/veileder.svg').default;
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import { Innholdstittel } from 'nav-frontend-typografi';
import getMessage from '../../util/i18n/i18nUtils';
import Person from '../../types/domain/Person';
import { commonActionCreators as common } from '../../redux/actions';

import '../../styles/engangsstonad.less';
import { DispatchProps } from 'app/redux/types';

interface StateProps {
    person: Person;
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export const IkkeMyndig: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <div id="js-ikkeMyndig">
                <DocumentTitle title="Kvittering - NAV Engangsstønad" />
                <LanguageToggle
                    language={props.language}
                    toggleLanguage={(languageCode: string) => props.dispatch(common.setLanguage(languageCode))}
                />
                <SimpleIllustration
                    svg={VeilederIllustration}
                    dialog={{
                        title: getMessage(intl, 'intro.snakkeboble.overskrift', {name: person.fornavn}),
                        text: getMessage(intl, 'intro.text.under18')
                    }}
                />
                <div className="responsiveContainer">
                    <div className="blokk-m">
                        <Innholdstittel>{getMessage(intl, 'intro.pageheading.soknadES')}</Innholdstittel>
                    </div>
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
            </div>
        );
    }
    return null;
};

// tslint:disable-next-line no-any
const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    language: state.commonReducer.language
});

export default connect(mapStateToProps)(injectIntl(IkkeMyndig));
