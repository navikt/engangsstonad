import * as React from 'react';
import { FormikProps, FieldArray } from 'formik';

import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { JaNeiSpørsmål } from 'components/form/ja-nei-spørsmål/JaNeiSpørsmål';

import { Questions } from '../steg-3/questions';
import { FormProps } from '../FormProps';
import CountryPicker from 'components/country-picker/CountryPicker';
import { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
import { Language } from 'intl/IntlProvider';

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
                    render={(arrayHelpers) => (
                        <CountryPicker
                            label={'label'}
                            language={Language.BOKMÅL}
                            utenlandsoppholdListe={values[Questions.oppholdSiste12Mnd] || []}
                            addVisit={arrayHelpers.push}
                            editVisit={(periode: Utenlandsopphold, index: number) =>
                                arrayHelpers.replace(index, periode)
                            }
                            deleteVisit={(periode: Utenlandsopphold) =>
                                arrayHelpers.remove(values[Questions.oppholdNeste12Mnd])
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
                    name={Questions.oppholdSiste12Mnd}
                    render={(arrayHelpers) => (
                        <CountryPicker
                            label={'label'}
                            language={Language.BOKMÅL}
                            utenlandsoppholdListe={values[Questions.oppholdNeste12Mnd] || []}
                            addVisit={arrayHelpers.push}
                            editVisit={(periode: Utenlandsopphold, index: number) =>
                                arrayHelpers.replace(index, periode)
                            }
                            deleteVisit={(periode: Utenlandsopphold) =>
                                arrayHelpers.remove(values[Questions.oppholdNeste12Mnd])
                            }
                        />
                    )}
                />
            )}
        </>
    );
};
export default Steg3;
