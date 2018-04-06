import * as React from 'react';
import { Collapse } from 'react-collapse';

export interface Props {
    children: React.ReactNode;
    /** Default true */
    synlig?: boolean;
    /** Default true */
    animert?: boolean;
}

const Skjemaspørsmål: React.StatelessComponent<Props> = ({ synlig = true, animert = false, children }) => {
    const getContent = () => <div className="skjemasporsmal blokk-s">{children}</div>;

    if (animert === true) {
        return <Collapse isOpened={synlig === true}>{getContent()}</Collapse>;
    }
    if (!synlig) {
        return null;
    }
    return getContent();
};

export default Skjemaspørsmål;
