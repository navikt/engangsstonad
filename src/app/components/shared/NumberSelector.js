import React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import Image from './Image';
import SubtractIcon from '../../assets/svg/subtract.svg';
import AddIcon from '../../assets/svg/add.svg';
import styles from './numberSelector.less';

type Props = {
    title: string
};

const NumberSelector = (props: Props) => (
    <SkjemaGruppe title={props.title}>
        <Image imageUrl={SubtractIcon} alt="" />
        <input className={styles.counterBox} disabled />
        <Image imageUrl={AddIcon} alt="" />
    </SkjemaGruppe>
);
export default NumberSelector;
