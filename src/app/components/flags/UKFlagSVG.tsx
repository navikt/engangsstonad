import React from 'react';

const UKFlagSVG = () => (
    <svg width={29} height={22}>
        <title>{'Flag_of_the_United_Kingdom'}</title>
        <defs>
            <path
                d="M12.5 9H25v9L12.5 9zm0 0v9H0l12.5-9zm0 0H0V0l12.5 9zm0 0V0H25L12.5 9z"
                id="prefix__a"
            />
        </defs>
        <g fill="none" fillRule="evenodd">
            <path fill="#00247D" d="M2 2v18h25V2z" />
            <path
                d="M2 2l25 18m0-18L2 20"
                stroke="#FFF"
                strokeWidth={3.75}
                fill="#000"
                fillRule="nonzero"
            />
            <g transform="translate(2 2)">
                <mask id="prefix__b" fill="#fff">
                    <use xlinkHref="#prefix__a" />
                </mask>
                <path
                    d="M0 0l25 18m0-18L0 18"
                    stroke="#CF142B"
                    strokeWidth={2.5}
                    fill="#000"
                    fillRule="nonzero"
                    mask="url(#prefix__b)"
                />
            </g>
            <path
                d="M14.5 2v18M2 11h25"
                stroke="#FFF"
                strokeWidth={6.25}
                fill="#000"
                fillRule="nonzero"
            />
            <path
                d="M14.5 2v18M2 11h25"
                stroke="#CF142B"
                strokeWidth={3.75}
                fill="#000"
                fillRule="nonzero"
            />
        </g>
    </svg>
);

export default UKFlagSVG;
