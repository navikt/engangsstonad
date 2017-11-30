// @flow
import React from 'react';

type Props = {
    imageUrl: string,
    alt: string
};

export const Image = (props: Props) => (
    <img src={props.imageUrl} alt={props.alt} />
);

export default Image;
