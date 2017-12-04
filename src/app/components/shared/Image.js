// @flow
import React from 'react';

type Props = {
    imageUrl: string,
    alt: string,
    className: string
};

export const Image = (props: Props) => (
    <img src={props.imageUrl} className={props.className} alt={props.alt} />
);

export default Image;
