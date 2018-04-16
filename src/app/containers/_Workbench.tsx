import * as React from 'react';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import Terminbekreftelse from '../connected-components/engangsstonad-steg/partials/steg1/Terminbekreftelse';
import FormBlock from 'components/form-block/FormBlock';
import { ValidDateInput } from '../lib';
import LabelText from 'components/labeltext/LabelText';
import { Feil } from 'components/skjema-input-element/types';
import ValidForm from '../lib/valid-form';
import { getTotalFileSize, bytesString } from 'util/attachment/utils';

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
        // setTimeout(() => {
        //     this.validForm.validateByName('vedlegg');
        // }, 0);
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
                    <ValidForm
                        summaryTitle="Det er feil i skjemaet"
                        noSummary={true}
                        onSubmit={() => null}
                    >
                        <FormBlock>
                            <Terminbekreftelse
                                vedlegg={this.state.vedlegg}
                                onFileDelete={file => this.removeVedlegg(file)}
                                onFilesSelect={files => this.addVedlegg(files)}
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
