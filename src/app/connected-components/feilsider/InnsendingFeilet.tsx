import * as React from 'react';
import DocumentTitle from 'react-document-title';

const { Ingress } = require('nav-frontend-typografi');

import '../../styles/engangsstonad.less';

export const InnsendingFeilet: React.StatelessComponent = () => {
    return (
        <div className="responsiveContainer">
            <DocumentTitle title="Feil - NAV Engangsstønad" />
            <Ingress>
                Noe gikk dessverre galt under innsending av søknaden din. Vennligst prøv igjen senere
            </Ingress>
        </div>
    );
};

export default InnsendingFeilet;
