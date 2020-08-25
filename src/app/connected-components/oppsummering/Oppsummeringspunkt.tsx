import * as React from 'react';
import { injectIntl } from 'react-intl';
import { ReactNode } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => (
    <div className="blokk-m">
        <Ekspanderbartpanel apen={false} tittel={<Undertittel>{tittel}</Undertittel>}>
            {children}
        </Ekspanderbartpanel>
    </div>
);

export default injectIntl(Oppsummeringspunkt);
