import * as React from 'react';
const Link = require('nav-frontend-lenker').default;
import CustomSVG, { IconRef } from 'components/custom-svg/CustomSVG';
import './linkWithIcon.less';

interface Props {
    iconRef: IconRef;
    href: string;
    linkText: string;
    iconSize?: number;
    onClick: Function;
}

const LinkWithIcon: React.StatelessComponent<Props> = (
    { onClick, iconRef, href, linkText, iconSize = 16, ...other }
) => (
    <div className="linkWithIcon" onClick={(e) => onClick(e)}>
        <CustomSVG size={iconSize} iconRef={iconRef} />
        <Link className="linkWithIcon__link" href={href} {...other}>
            {linkText}
        </Link>
    </div>
);

export default LinkWithIcon;
