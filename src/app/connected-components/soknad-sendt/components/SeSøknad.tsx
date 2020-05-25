import React from 'react';
import PaperclipIkon from 'assets/PaperclipIkon';
import Lenke from 'nav-frontend-lenker';

import './seSøknad.less';
import BEMHelper from 'common/util/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';

const SeSøknad = () => {
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
                    Se og last ned søknaden din
                </Lenke>
            </div>
            <div className={bem.element('datoWrapper')}>
                <Element>SENDT INN:</Element>
                <Normaltekst>&nbsp; 25. Mai 2020, kl. 12:00</Normaltekst>
            </div>
        </div>
    );
};
export default SeSøknad;
