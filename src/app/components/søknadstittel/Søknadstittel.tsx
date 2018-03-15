import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import './søknadstittel.less';

type Props = { tittel: string };

export default class Søknadstittel extends React.Component<Props> {
    render() {
        const { tittel } = this.props;

        return (
            <div className="søknadstittel">
                <Innholdstittel>{tittel}</Innholdstittel>
            </div>
        );
    }
}
