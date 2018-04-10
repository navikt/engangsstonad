import * as React from 'react';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import Terminbekreftelse from '../connected-components/engangsstonad-steg/partials/steg1/Terminbekreftelse';

export interface Props {}

const f = new File([''], 'this.is-some-øpomgFilename.test.file.png');
const vedlegg: File[] = [f];

const Workbench: React.StatelessComponent<Props> = props => (
    <div>
        <Søknadstittel tittel="Workbench" />
        <div className="responsiveContainer">
            <Terminbekreftelse vedlegg={vedlegg} onFileDelete={() => null} onFileSelect={() => null} />
        </div>
    </div>
);

export default Workbench;
