import * as React from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { FormikProps } from 'formik';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import Veileder from 'components/veileder/Veileder';
import { AppState } from 'reducers/reducers';
import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';
import { Language } from 'intl/IntlProvider';

import { commonActionCreators as common } from '../../../redux/actions';
import Oppsummering from '../../oppsummering/Oppsummering';
import { FormProps } from '../FormProps';

interface StateProps {
    bekreftetInformasjon: boolean;
    language: Language;
}

interface OwnProps {
    formikProps: FormikProps<Partial<FormProps>>;
}

type Props = OwnProps & StateProps & InjectedIntlProps & DispatchProps;

const Steg4: React.StatelessComponent<Props> = ({ intl, dispatch, bekreftetInformasjon, formikProps, language }) => {
    return (
        <Skjemasteg tittel={getMessage(intl, 'oppsummering.sectionheading')}>
            <div className="blokk-m">
                <Veilederpanel kompakt={true} svg={<Veileder />}>
                    <FormattedMessage id="oppsummering.text.lesNoye" />
                </Veilederpanel>
            </div>
            <Oppsummering søknad={mapFormStateToEngangsstonadDto(formikProps.values, language)} />
            <div className="blokk-m">
                <BekreftCheckboksPanel
                    inputProps={{ name: 'bekreftOpplysninger' }}
                    checked={bekreftetInformasjon}
                    onChange={() => dispatch(common.setBekreftetInformasjon(!bekreftetInformasjon))}
                    label={getMessage(intl, 'oppsummering.text.samtykke')}
                />
            </div>
        </Skjemasteg>
    );
};

const mapStateToProps = (state: AppState) => ({
    bekreftetInformasjon: state.commonReducer.bekreftetInformasjon,
    language: state.commonReducer.language
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Steg4));
