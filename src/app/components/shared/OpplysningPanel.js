// @flow
import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import DisplayTextWithLabel from '../shared/DisplayTextWithLabel';
import ElementWrapper from './../../util/ElementWrapper';
import styles from './opplysningPanel.less';

type Props = {
    imgSrc: any,
    opplysningData: any
};

const OpplysningPanel = (props: Props) => {
    const generateTextWithLabel = () => props.opplysningData.map((opplysninger) => (
        <DisplayTextWithLabel {...opplysninger} />
    ));

    return (
        <ElementWrapper>
            <div className={styles.opplysningHeader}>
                <img className={styles.opplysningLogo} src={props.imgSrc} alt="nav ansatt" />
                <Undertittel className={styles.opplysningTittel}>Arbeid</Undertittel>
            </div>
            {generateTextWithLabel()}
        </ElementWrapper>
    );
};
export default OpplysningPanel;
