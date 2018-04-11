import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import './søknadstittel.less';

type Props = { tittel: string };

export default class Søknadstittel extends React.Component<Props> {
    render() {
        const { tittel } = this.props;

        return (
            <div className="søknadstittel">
                <Systemtittel>{tittel}</Systemtittel>
            </div>
        );
    }
}
