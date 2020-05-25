import React from 'react';
import moment from 'moment';
import PaperclipIkon from 'assets/PaperclipIkon';
import Lenke from 'nav-frontend-lenker';

import './seSøknad.less';
import BEMHelper from 'common/util/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface Props {
    mottattDato: string;
    saksNr: string;
}

const SeSøknad: React.FunctionComponent<Props> = ({ mottattDato, saksNr }) => {
    const bem = BEMHelper('seSøknad');
    return (
        <div className={bem.className}>
            <div className={bem.element('lenkeWrapper')}>
                <PaperclipIkon width="24" height="24" />
                <Lenke
                    className={bem.element('lenke')}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FormattedMessage id="søknadSendt.oversikt.link" />
                </Lenke>
            </div>
            <div className={bem.element('datoWrapper')}>
                <Element>
                    <FormattedMessage id="søknadSendt.oversikt.sendtinn" />
                </Element>
                <Normaltekst>
                    &nbsp;
                    <FormattedMessage
                        id="kvittering.text.soknadMottatt"
                        values={{
                            klokkeslett: moment(mottattDato).format('HH:mm'),
                            dato: moment(mottattDato).format('LL'),
                            harSaksnummer: saksNr !== undefined,
                            saksNr: saksNr,
                        }}
                    />
                </Normaltekst>
            </div>
        </div>
    );
};
export default SeSøknad;
