import * as React from 'react';
import { FieldArray } from 'formik';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { JaNeiSpørsmål } from 'components/form/radio-panel-gruppe-responsive/utils/JaNeiSpørsmål';
import UtenlandsoppholdSeksjon from 'components/utenlandsopphold/utenlansopphold-seksjon/UtenlandsoppholdSeksjon';

import { Questions } from './questions';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import StegProps from '../StegProps';

const Steg3: React.FunctionComponent<StegProps> = ({ formikProps, language }) => {
    const { values } = formikProps;
    return (
        <>
            <RadioPanelGruppeResponsiveWrapper
                name={Questions.harVærtIUtlandSiste12Mnd}
                radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
                twoColumns={true}
            />

            {values[Questions.harVærtIUtlandSiste12Mnd] && (
                <FieldArray
                    name={Questions.oppholdSiste12Mnd}
                    render={({ push, remove, replace }) => (
                        <UtenlandsoppholdSeksjon
                            label={<FormattedMessage id={Questions.oppholdSiste12Mnd} />}
                            language={language}
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

            {(values[Questions.harVærtIUtlandSiste12Mnd] === false ||
                values[Questions.oppholdSiste12Mnd]!.length > 0) && (
                <>
                    <RadioPanelGruppeResponsiveWrapper
                        name={Questions.skalVæreIUtlandNeste12Mnd}
                        radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
                        twoColumns={true}
                    />

                    {values[Questions.skalVæreIUtlandNeste12Mnd] && (
                        <FieldArray
                            name={Questions.oppholdNeste12Mnd}
                            render={({ push, remove, replace }) => {
                                return (
                                    <UtenlandsoppholdSeksjon
                                        label={<FormattedMessage id={Questions.oppholdNeste12Mnd} />}
                                        language={language}
                                        utenlandsoppholdListe={values[Questions.oppholdNeste12Mnd]!}
                                        gyldigTildsperiode={{
                                            fom: moment().format(moment.HTML5_FMT.DATE),
                                            tom: moment()
                                                .add(1, 'year')
                                                .format(moment.HTML5_FMT.DATE)
                                        }}
                                        addVisit={push}
                                        editVisit={(periode: Utenlandsopphold, index: number) =>
                                            replace(index, periode)
                                        }
                                        deleteVisit={(periode: Utenlandsopphold) =>
                                            remove(values[Questions.oppholdNeste12Mnd]!.indexOf(periode))
                                        }
                                    />
                                );
                            }}
                        />
                    )}

                </>
                
            )}
        </>
    );
};
export default Steg3;
