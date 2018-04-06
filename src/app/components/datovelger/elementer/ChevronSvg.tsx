import * as React from 'react';

export type ChevronRetning = 'opp' | 'ned' | 'høyre' | 'venstre';

export interface Props {
    retning?: ChevronRetning;
}

const getRotationTransform = (retning?: ChevronRetning): {} | undefined => {
    switch (retning) {
        case 'venstre':
            return 'rotate(180deg)';
        case 'opp':
            return 'rotate(270deg)';
        case 'ned':
            return 'rotate(90deg)';
        default:
            return undefined;
    }
};

const Chevron = (props: Props) => {
    const rotation = getRotationTransform(props.retning);
    const style = rotation
        ? {
              transform: rotation
          }
        : undefined;
    return (
        <svg style={style} width={16} height={16} viewBox="0 0 16 24" role="presentation" aria-hidden="true">
            <title>Chevron</title>
            <path
                d="M1.5 24a1 1 0 0 1-.646-1.764L12.953 12 .853 1.764A1 1 0 1 1 2.146.236l13 11a1.005 1.005 0 0 1 0 1.528l-13 11a1.003 1.003 0 0 1-.645.236"
                fill="#3e3832"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default Chevron;
