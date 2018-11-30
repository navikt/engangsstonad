import * as React from 'react';
import * as classnames from 'classnames';

import VeilederNormal from './VeilederNormalSvg';
import VeilederKompakt from './VeilederKompaktSvg';

import './veileder.less';
import Veiviser from './VeiviserSvg';

export type Ansiktstype = 'glad' | 'undrende' | 'skeptisk';

export interface VeilederProps {
    ansikt?: 'glad' | 'undrende' | 'skeptisk';
    farge?: 'lilla' | 'gronn' | 'bla';
    stil?: 'normal' | 'kompakt' | 'veiviser';
}

interface OwnProps {
    className?: string;
}

type Props = VeilederProps & OwnProps;

const Veileder = (props: Props) => {
    const {
        className,
        farge = 'lilla',
        ansikt = 'glad',
        stil = 'normal',
        ...rest
    } = props;

    const svgProps = {
        ...rest,
        className: classnames(
            'veileder',
            `veileder--tema-${farge}`,
            `veileder--${ansikt}`,
            `veileder--${stil}`,
            props.className
        )
    };

    if (stil === 'normal') {
        return <VeilederNormal svgProps={svgProps} />;
    } else if (stil === 'veiviser') {
        return <Veiviser />;
    } else {
        return <VeilederKompakt svgProps={svgProps} />;
    }
};

export default Veileder;
