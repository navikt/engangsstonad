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

const URL_SØKNADSVALG =
    'https://tjenester.nav.no/soknadforeldrepenger/app/start#/soknadsvalg';

type Props = StateProps & DispatchProps & InjectedIntlProps;

export const ErMann: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, person } = props;

    if (person) {
        return (
            <div id="js-erMann">
                <DocumentTitle title="Kvittering - NAV Engangsstønad" />
                <LanguageToggle
                    language={props.language}
                    toggleLanguage={(languageCode: string) =>
                        props.dispatch(common.setLanguage(languageCode))
                    }
                />
                <SimpleIllustration
                    svg={VeilederIllustration}
                    dialog={{
                        title: getMessage(
                            intl,
                            'intro.snakkeboble.overskrift',
                            { name: person.fornavn }
                        ),
                        text: (
                            <div>
                                <FormattedMessage id="intro.text.erMann" />
                                <br />
                                <Lenke
                                    className="intro-snakkelenke"
                                    href={URL_SØKNADSVALG}
                                >
                                    {getMessage(intl, 'intro.text.erMann.link')}
                                </Lenke>
                            </div>
                        )
                    }}
                />
                <div className="responsiveContainer">
                    <div className="blokk-s">
                        <Innholdstittel>
                            {getMessage(intl, 'intro.pageheading.erMann')}
                        </Innholdstittel>
                    </div>
                    <div className="blokk-l">
                        <Ingress>
                            {intl.formatMessage({ id: 'intro.text.omES' })}
                        </Ingress>
                    </div>
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
