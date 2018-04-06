import * as React from 'react';

const KalenderIkon = (props: {}) => (
    <svg height={16} width={16} viewBox="0 0 18 18" {...props} role="presentation" aria-hidden="true">
        <title>Kalender</title>
        <g stroke="#0067C5" fill="none" fillRule="evenodd">
            <path d="M4 2.667H1.333v14h15.334v-14H14" />
            <path d="M4 1.333h2V4H4zm8 0h2V4h-2zM6 2h6M1.333 6h15.334" />
        </g>
    </svg>
);

export default KalenderIkon;
