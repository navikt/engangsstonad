// @flow
import React from 'react';

import NavLogoUrl from './../../images/Logo.svg';

type Props = {
    className: string
};

export const NavLogo = (props: Props) => (
    <img src={NavLogoUrl} alt="NAV Logo" className={props.className} />
);

export default NavLogo;
