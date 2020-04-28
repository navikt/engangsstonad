import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Veilederpanel from 'nav-frontend-veilederpanel';
import * as moment from 'moment';

import { isVisible } from 'components/form/visibility/withVisibility';
import { VisibilityContext } from 'components/form/visibility/VisibilityContext';
import Select from 'components/form/select/Select';
import { JaNeiSpørsmål } from 'components/form/radio-panel-gruppe-responsive/utils/JaNeiSpørsmål';
import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import DatovelgerElement from 'components/form/date-input/DateInput';
import { Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentUploader from 'components/form/attachment-uploader/AttachmentUploader';
import Veileder from 'components/ikoner/flags/veileder/Veileder';

import { Questions } from './questions';
import StegProps from '../StegProps';

import './steg1.less';

const Steg1: React.StatelessComponent<StegProps> = ({ formikProps }) => {
    const { values } = formikProps;
    const visibilityContext = React.useContext(VisibilityContext);
    const dagensDato = moment().format(moment.HTML5_FMT.DATE);

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
                        value,
                    }))}
                />
            )}

            {values[Questions.erFødt] && (
                <DatovelgerElement
                    name={Questions.fødselsdato}
                    parent={Questions.antallBarn}
                    avgrensninger={{ maksDato: dagensDato }}
                />
            )}

            {values[Questions.erFødt] === false && (
                <>
                    <DatovelgerElement
                        name={Questions.termindato}
                        parent={Questions.antallBarn}
                        avgrensninger={{ minDato: dagensDato }}
                    />

                    {isVisible(Questions.terminberkreftelse, visibilityContext.visibleComponents) && (
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
                            avgrensninger={{ maksDato: dagensDato }}
                        />
                    )}
                </>
            )}
        </div>
    );
};
export default Steg1;
