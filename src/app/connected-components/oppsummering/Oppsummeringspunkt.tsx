import * as React from 'react';
import { ReactNode } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => {
    return (
        <div className="blokk-m">
            <Ekspanderbartpanel apen={false} tittel={tittel} tittelProps="undertittel">
                {children}
            </Ekspanderbartpanel>
        </div>
    );
};

export default Oppsummeringspunkt;
