import * as React from 'react';
import { FormikProps, FieldArray } from 'formik';

import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { JaNeiSpørsmål } from 'components/form/ja-nei-spørsmål/JaNeiSpørsmål';

import { Questions } from '../steg-3/questions';
import { FormProps } from '../FormProps';
import CountryPicker from 'components/utenlandsopphold/Utenlandsopphold';
import { Utenlandsopphold } from '../../../../app/types/domain/InformasjonOmUtenlandsopphold';
import { Language } from '../../../intl/IntlProvider';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

interface Props {
    formikProps: FormikProps<Partial<FormProps>>;
}

const Steg3: React.FunctionComponent<Props> = ({ formikProps }) => {
    const { values } = formikProps;
    return (
        <>
            <RadioPanelGruppeResponsiveWrapper
                name={Questions.harVærtIUtlandSiste12Mnd}
                radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
            />
            {values[Questions.harVærtIUtlandSiste12Mnd] && (
                <FieldArray
                    name={Questions.oppholdSiste12Mnd}
                    render={({ push, remove, replace }) => (
                        <CountryPicker
                            label={<FormattedMessage id={Questions.oppholdSiste12Mnd} />}
                            language={Language.BOKMÅL}
                            utenlandsoppholdListe={values[Questions.oppholdSiste12Mnd]!}
                            gyldigTildsperiode={{
                                fom: moment()
                                    .subtract(1, 'year')
                                    .format(moment.HTML5_FMT.DATE),
                                tom: moment().format(moment.HTML5_FMT.DATE)
                            }}
                            addVisit={push}
                            editVisit={(periode: Utenlandsopphold, index: number) => replace(index, periode)}
                            deleteVisit={(periode: Utenlandsopphold) =>
                                remove(values[Questions.oppholdNeste12Mnd]!.indexOf(periode))
                            }
                        />
                    )}
                />
            )}

            <RadioPanelGruppeResponsiveWrapper
                name={Questions.skalVæreIUtlandNeste12Mnd}
                radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
            />
            {values[Questions.skalVæreIUtlandNeste12Mnd] && (
                <FieldArray
                    name={Questions.oppholdNeste12Mnd}
                    render={({ push, remove, replace }) => (
                        <CountryPicker
                            label={<FormattedMessage id={Questions.oppholdNeste12Mnd} />}
                            language={Language.BOKMÅL}
                            utenlandsoppholdListe={values[Questions.oppholdNeste12Mnd]!}
                            gyldigTildsperiode={{
                                fom: moment().format(moment.HTML5_FMT.DATE),
                                tom: moment()
                                    .add(1, 'year')
                                    .format(moment.HTML5_FMT.DATE)
                            }}
                            addVisit={push}
                            editVisit={(periode: Utenlandsopphold, index: number) => replace(index, periode)}
                            deleteVisit={(periode: Utenlandsopphold) =>
                                remove(values[Questions.oppholdNeste12Mnd]!.indexOf(periode))
                            }
                        />
                    )}
                />
            )}
        </>
    );
};
export default Steg3;
