import * as React from 'react';
import { Link } from 'react-router-dom';
const { VenstreChevron } = require('nav-frontend-chevron');

import './backLink.less';

interface Props {
    href: string;
    text: string;
}

const BackLink: React.StatelessComponent<Props> = ({ href, text = 'Tilbake' }) => (
    <Link className="backLink" to={href}>
        <VenstreChevron />
        {text}
    </Link>
);

export default BackLink;
