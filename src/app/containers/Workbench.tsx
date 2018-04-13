import * as React from 'react';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import Terminbekreftelse from '../connected-components/engangsstonad-steg/partials/steg1/Terminbekreftelse';
import FormBlock from 'components/form-block/FormBlock';
import { ValidDateInput } from '../lib';
const ValidForm = require('../lib/valid-form').default;
import LabelText from 'components/labeltext/LabelText';
import { Feil } from 'components/skjema-input-element/types';
import { getTotalFileSize, bytesString } from 'components/attachment/utils';

const MAX_TOTAL_SIZE = 1024 * 1024 * 2;

export interface Props {}

export interface State {
    vedlegg: File[];
}

class Workbench extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.addVedlegg = this.addVedlegg.bind(this);
        this.validerVedlegg = this.validerVedlegg.bind(this);
        this.removeVedlegg = this.removeVedlegg.bind(this);
        this.state = {
            vedlegg: []
        };
    }
    addVedlegg(files: File[]) {
        this.setState({
            vedlegg: [...this.state.vedlegg, ...files]
        });
    }
    removeVedlegg(file: File) {
        this.setState({
            vedlegg: [...this.state.vedlegg.filter(f => f !== file)]
        });
    }
    validerVedlegg(): Feil | undefined {
        if (this.state.vedlegg.length === 0) {
            return undefined;
        }
        const samletFilstørrelse = getTotalFileSize(this.state.vedlegg);
        if (samletFilstørrelse > MAX_TOTAL_SIZE) {
            return {
                feilmelding: `Filene må være under ${bytesString(
                    MAX_TOTAL_SIZE
                )} til sammen`
            };
        }
        return undefined;
    }
    render() {
        const { vedlegg } = this.state;
        return (
            <div>
                <Søknadstittel tittel="Workbench" />
                <div className="responsiveContainer">
                    <ValidForm noSummary={true} onSubmit={() => null}>
                        <FormBlock>
                            <Terminbekreftelse
                                vedlegg={this.state.vedlegg}
                                onFileDelete={file => this.removeVedlegg(file)}
                                onFilesSelect={files => this.addVedlegg(files)}
                                feil={this.validerVedlegg()}
                            />
                        </FormBlock>

                        <FormBlock visible={vedlegg.length > 0}>
                            <div key="dateInputTerminBekreftelse">
                                <ValidDateInput
                                    id="terminbekreftelse"
                                    name="terminbekreftelse"
                                    dato={new Date()}
                                    label={
                                        <LabelText intlId="relasjonBarn.text.datoTerminbekreftelse" />
                                    }
                                    onChange={(dato: Date) => null}
                                    validators={[]}
                                />
                            </div>
                        </FormBlock>
                    </ValidForm>
                </div>
            </div>
        );
    }
}

export default Workbench;
