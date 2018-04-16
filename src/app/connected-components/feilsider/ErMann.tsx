import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl, FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
const { Ingress } = require('nav-frontend-typografi');
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
const VeilederIllustration = require('assets/svg/veileder.svg').default;
import LanguageToggle from '../../intl/LanguageToggle';
import getMessage from '../../util/i18n/i18nUtils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { commonActionCreators as common } from '../../redux/actions';

import '../../styles/engangsstonad.less';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Person from '../../types/domain/Person';
import { DispatchProps } from 'app/redux/types';

interface StateProps {
    person: Person;
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

export const ErMann: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    const oldApplicationLink = (
        <Lenke href={'https://tjenester.nav.no/soknadforeldrepenger/app/start#/soknadsvalg'} >
            {getMessage(intl, 'intro.text.erMann.link')}
        </Lenke>
    );

    if (person) {
        return (
            <div id="js-erMann">
                <DocumentTitle title="Kvittering - NAV Engangsstønad" />
                <LanguageToggle
                    language={props.language}
                    toggleLanguage={(languageCode: string) => props.dispatch(common.setLanguage(languageCode))}
                />
                <SimpleIllustration
                    svg={VeilederIllustration}
                    dialog={{
                        title: getMessage(intl, 'intro.snakkeboble.overskrift', { name: person.fornavn }),
                        text: <FormattedMessage id="intro.text.erMann" values={{link: oldApplicationLink}} />
                    }}
                />
                <div className="responsiveContainer">
                    <div className="blokk-s">
                        <Innholdstittel>{getMessage(intl, 'intro.pageheading.soknadES')}</Innholdstittel>
                    </div>
                    <Ingress>
                        {intl.formatMessage({ id: 'intro.text.omES' })}
                    </Ingress>
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

export default connect(mapStateToProps)(injectIntl(ErMann));
