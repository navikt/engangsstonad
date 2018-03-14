import * as React from 'react';
import CustomSVG, { IconRef } from '../custom-svg/CustomSVG';
import './simpleIllustration.less';

interface Props {
    svg: IconRef;
}

const SimpleIllustration: React.StatelessComponent<Props> = ({ svg }) => {
    return (
        <div className="simpleIllustration">
            <CustomSVG iconRef={svg} />
        </div>
    );
};

export default SimpleIllustration;
