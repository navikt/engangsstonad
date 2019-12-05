import * as React from 'react';
import './søknadstittel.less';

interface Props {
    tittel: string;
}

export default class Søknadstittel extends React.Component<Props> {
    render() {
        const { tittel } = this.props;

        return (
            <div className="søknadstittel">
                <h1 className="typo-undertittel">{tittel}</h1>
            </div>
        );
    }
}
