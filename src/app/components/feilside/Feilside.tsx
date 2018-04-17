import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import LanguageToggle from '../../intl/LanguageToggle';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';

const VeilederIllustration = require('assets/svg/veileder.svg').default;

export interface Props {
    containerId?: string;
    dokumenttittel: string;
    illustrasjon?: {
        tittel: string;
        tekst: React.ReactNode;
        lenke?: {
            url: string;
            tekst: string;
        };
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    language?: string;
    setLanguage?: (languageCode: string) => void;
}

const Feilside: React.StatelessComponent<Props> = ({
    containerId,
    dokumenttittel,
    illustrasjon,
    tittel,
    ingress,
    language,
    setLanguage
}) => {
    return (
        <div id={containerId}>
            <DocumentTitle title={dokumenttittel} />
            {setLanguage &&
                language && (
                    <LanguageToggle
                        language={language}
                        toggleLanguage={setLanguage}
                    />
                )}
            {illustrasjon && (
                <SimpleIllustration
                    svg={VeilederIllustration}
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <div>
                                {illustrasjon.tekst}
                                {illustrasjon.lenke && (
                                    <Lenke
                                        className="intro-snakkelenke"
                                        href={illustrasjon.lenke.url}
                                    >
                                        {illustrasjon.lenke.tekst}
                                    </Lenke>
                                )}
                            </div>
                        )
                    }}
                />
            )}
            <div className="responsiveContainer">
                <div className="blokk-s">
                    <Innholdstittel>{tittel}</Innholdstittel>
                </div>
                <div className="blokk-l">
                    <Ingress>{ingress}</Ingress>
                </div>
            </div>
        </div>
    );
};

export default Feilside;
