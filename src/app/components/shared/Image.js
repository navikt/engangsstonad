// @flow
import React from 'react';

type Props = {
    className: string,
    imageUrl: string
};

export const Image = (props: Props) => (
    <img src={props.imageUrl} alt="NAV Logo" className={props.className} />
);

export default Image;
