import * as React from 'react';
import { Link } from 'react-router-dom';
const Icon = require('nav-frontend-ikoner-assets').default;
import './linkWithIcon.less';

interface Props {
    iconKind: string;
    href: string;
    linkText: string;
    iconSize: number;
    onClick: Function;
}

const LinkWithIcon: React.StatelessComponent<Props> = (
    { onClick, iconKind, href, linkText, iconSize = 16, ...other }
) => (
    <div className="linkWithIcon" onClick={(e) => onClick(e)}>
        <Icon kind={iconKind} size={iconSize} />
        <Link className="linkWithIcon__link" to={href} {...other}>
            {linkText}
        </Link>
    </div>
);

export default LinkWithIcon;
