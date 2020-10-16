import React from 'react';
import DocumentTitle from 'react-document-title';
import { useIntl } from 'react-intl';

export interface Props {
    tittel?: string;
    children: React.ReactNode;
}

const EngangsstønadSteg: React.FunctionComponent<Props> = ({ tittel, children }) => {
    const intl = useIntl();
    let dokumenttittel = intl.formatMessage({
        id: 'intro.standard.dokumenttittel',
    });
    if (tittel) {
        dokumenttittel = `${dokumenttittel} - ${tittel}`;
    }

    return (
        <div className="engangsstonad__step">
            <DocumentTitle title={dokumenttittel} />
            {children}
        </div>
    );
};

export default EngangsstønadSteg;
