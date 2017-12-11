import React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import SubtractIcon from '../../../assets/svg/subtract.svg';
import AddIcon from '../../../assets/svg/add.svg';
import styles from './numberSelector.less';

type Props = {
    title: string
};

const NumberSelector = (props: Props) => (
    <SkjemaGruppe title={props.title}>
        {SubtractIcon}
        <input className={styles.counterBox} disabled />
        {AddIcon}
    </SkjemaGruppe>
);
export default NumberSelector;
