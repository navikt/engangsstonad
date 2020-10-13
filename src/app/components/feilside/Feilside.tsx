import React from 'react';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import LanguageToggle from '../../intl/LanguageToggle';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { VeilederProps } from 'components/veileder/Veileder';
import { Språkkode } from 'intl/types';

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
        veileder?: VeilederProps;
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    språkkode?: Språkkode;
    setLanguage?: (languageCode: string) => void;
}

const Feilside: React.FunctionComponent<Props> = ({
    containerId,
    dokumenttittel,
    illustrasjon,
    tittel,
    ingress,
    språkkode,
    setLanguage,
}) => {
    return (
        <div id={containerId}>
            <DocumentTitle title={dokumenttittel} />
            {setLanguage && språkkode && <LanguageToggle språkkode={språkkode} toggleLanguage={setLanguage} />}
            {illustrasjon && (
                <SimpleIllustration
                    veileder={illustrasjon.veileder}
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <div>
                                <div>{illustrasjon.tekst}</div>
                                {illustrasjon.lenke && (
                                    <Lenke className="intro-snakkelenke" href={illustrasjon.lenke.url}>
                                        {illustrasjon.lenke.tekst}
                                    </Lenke>
                                )}
                            </div>
                        ),
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
