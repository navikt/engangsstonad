import React from 'react';

import Icon from 'nav-frontend-ikoner-assets';

import './numberSelector.less';

const NumberSelector = () => (
    <div className="numberSelectorWrapper">
        <Icon kind="minus" size={32} />
        <input className="counterBox" disabled />
        <Icon kind="tilsette" size={32} />
    </div>
);

export default NumberSelector;
