import * as React from 'react';

export interface Props {
    synlig?: boolean;
}

const Skjemaspørsmål: React.StatelessComponent<Props> = ({ synlig, children }) => {
    if (!synlig) {
        return null;
    }
    return <div className="skjemasporsmal blokk-m">{children}</div>;
};

export default Skjemaspørsmål;
