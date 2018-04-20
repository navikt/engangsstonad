import * as React from 'react';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

import './linkButton.less';

const LinkButton: React.StatelessComponent<Props> = props => (
    <button type="button" className="linkButton" {...props} />
);

export default LinkButton;
