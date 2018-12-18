import * as React from 'react';
import * as classnames from 'classnames';

import './veilederinfo.less';
import Veileder, { Ansiktstype } from '../veileder/Veileder';
import Veiviser from 'components/veiviser/VeiviserSvg';

type Infotype = 'info' | 'advarsel' | 'feil';
type Ikon = 'veileder' | 'veiviser';

export interface VeilederInfoProps {
    utvidetInfo?: React.ReactNode;
    ikon: Ikon;
    visIkon?: boolean;
    stil?: 'kompakt' | 'normal' | 'kunTekst';
    type?: Infotype;
}

const getAnsiktFromType = (type: Infotype): Ansiktstype => {
    switch (type) {
        case 'advarsel':
            return 'undrende';
        case 'feil':
            return 'skeptisk';
        default:
            return 'glad';
    }
};

const renderIkon = (ikon: Ikon, type: Infotype) => {
    if (ikon === 'veileder') {
        return (
            <Veileder
                farge="lilla"
                ansikt={getAnsiktFromType(type)}
                stil="kompakt"
            />
        );
    } else {
        return <Veiviser />;
    }
};

const Veilederinfo: React.StatelessComponent<VeilederInfoProps> = ({
    utvidetInfo,
    ikon,
    visIkon = true,
    stil = 'normal',
    type = 'info' as Infotype,
    children
}) => {
    return (
        <div
            className={classnames(
                'veilederinfo',
                `veilederinfo--${stil}`,
                `veilederinfo--${type}`
            )}
        >
            {visIkon && (
                <span
                    className="veilederinfo__veileder"
                    role="presentation"
                    aria-hidden={true}
                >
                    {renderIkon(ikon, type)}
                </span>
            )}

            <div
                className={classnames(
                    'veilederinfo__innhold',
                    `veilederinfo__innhold--${type}`,
                    'typo-normal'
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default Veilederinfo;
