import * as React from 'react';
import classNames from 'classnames';

import './linkButton.less';
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const LinkButton: React.StatelessComponent<Props> = ({ className, ...rest }) => {
    return <button type="button" className={classNames('linkButton', className)} {...rest} />;
};
export default LinkButton;
