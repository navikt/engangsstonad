// @flow
import React from 'react';

import DisplayTextWithLabel from '../text-with-label/DisplayTextWithLabel';
import IconWithText from '../icon-with-text/IconWithText';
import './opplysningpanel.less';

type Props = {
    iconKind: string,
    opplysningData: Array<Object>,
    title: string
};

const OpplysningPanel = (props: Props) => (
    <div className="opplysningPanel">
        <IconWithText kind={props.iconKind} text={props.title} />
        {
            props.opplysningData.map((opplysninger, index) => (
                <DisplayTextWithLabel
                    // eslint-disable-next-line react/no-array-index-key
                    key={opplysninger.text + index}
                    {...opplysninger}
                />
            ))
        }
    </div>
);

export default OpplysningPanel;
