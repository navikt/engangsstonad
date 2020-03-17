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
    const { values } = formikProps;
    return (
        <div className="steg1">
            <RadioPanelGruppeResponsiveWrapper
                name={Questions.erFødt}
                radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
            />

            <RadioPanelGruppeResponsiveWrapper
                name={Questions.antallBarn}
                parent={Questions.erFødt}
                radioValues={[1, 2, 3].map(String)}
            />

            {values[Questions.antallBarn]! >= 3 && (
                <Select
                    name={Questions.antallBarn}
                    parent={Questions.erFødt}
                    options={[3, 4, 5, 6, 7, 8, 9].map((value) => ({
                        label: String(value),
                        value
                    }))}
                />
            )}

            {values[Questions.erFødt] && (
                <DatovelgerElement
                    name={Questions.fødselsdato}
                    parent={Questions.antallBarn}
                    avgrensninger={{ maksDato: moment().format(moment.HTML5_FMT.DATE) }}
                />
            )}

            {values[Questions.erFødt] === false && (
                <>
                    <DatovelgerElement name={Questions.termindato} parent={Questions.antallBarn} />

                    {status[Questions.termindato]?.visible && (
                        <Veilederpanel kompakt={true} svg={<Veileder />}>
                            <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
                        </Veilederpanel>
                    )}

                    <AttachmentUploader
                        name={Questions.terminberkreftelse}
                        parent={Questions.termindato}
                        skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                    />

                    {values[Questions.terminberkreftelse]!.length > 0 && (
                        <DatovelgerElement
                            name={Questions.terminbekreftelseDato}
                            parent={Questions.terminberkreftelse}
                        />
                    )}
                </>
            )}
        </div>
    );
};
export default Steg1;
