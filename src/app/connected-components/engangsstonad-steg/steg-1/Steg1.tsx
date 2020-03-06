import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Veilederpanel from 'nav-frontend-veilederpanel';
import * as moment from 'moment';

import Select from 'components/form/select/Select';
import { JaNeiSpørsmål } from 'components/form/radio-panel-gruppe-responsive/utils/JaNeiSpørsmål';
import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import DatovelgerElement from 'components/form/date-input/DateInput';
import { Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentUploader from 'components/form/attachment-uploader/AttachmentUploader';
import Veileder from 'components/veileder/Veileder';

import { Questions } from './questions';
import StegProps from '../StegProps';

import './steg1.less';

const Steg1: React.StatelessComponent<StegProps> = ({ formikProps }) => {
    const { values, touched } = formikProps;
    return (
        <div className="steg1">
            <RadioPanelGruppeResponsiveWrapper
                name={Questions.erFødt}
                radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
            />

            {touched[Questions.erFødt] && (
                <RadioPanelGruppeResponsiveWrapper name={Questions.antallBarn} radioValues={[1, 2, 3].map(String)} />
            )}

            {values[Questions.antallBarn]! >= 3 && (
                <Select
                    name={Questions.antallBarn}
                    options={[3, 4, 5, 6, 7, 8, 9].map((value) => ({
                        label: String(value),
                        value
                    }))}
                />
            )}

            {touched[Questions.antallBarn] && values[Questions.erFødt] && (
                <DatovelgerElement
                    name={Questions.fødselsdato}
                    avgrensninger={{ maksDato: moment().format(moment.HTML5_FMT.DATE) }}
                />
            )}

            {touched[Questions.antallBarn] && values[Questions.erFødt] === false && (
                <>
                    <DatovelgerElement name={Questions.termindato} />

                    {values[Questions.termindato] && (
                        <>
                            <Veilederpanel kompakt={true} svg={<Veileder />}>
                                <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
                            </Veilederpanel>

                            <AttachmentUploader
                                name={Questions.terminberkreftelse}
                                skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                            />
                        </>
                    )}

                    {values[Questions.termindato] && values[Questions.terminberkreftelse]!.length > 0 && (
                        <DatovelgerElement name={Questions.terminbekreftelseDato} />
                    )}
                </>
            )}
        </div>
    );
};
export default Steg1;
