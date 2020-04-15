import * as React from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { WrappedComponentProps, FormattedMessage } from 'react-intl';

import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Veileder from 'components/ikoner/flags/veileder/Veileder';
import { AppState } from 'reducers/index';
import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';

import { commonActionCreators as common } from '../../redux/actions';
import Oppsummering from '../../pages/oppsummering/Oppsummering';
import StegProps from '../StegProps';

interface StateProps {
    bekreftetInformasjon: boolean;
}

type Props = StegProps & StateProps & WrappedComponentProps & DispatchProps;
const Steg4: React.StatelessComponent<Props> = ({ intl, dispatch, bekreftetInformasjon, formikProps, language }) => {
    return (
        <>
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
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    bekreftetInformasjon: state.commonReducer.bekreftetInformasjon
});

export default connect<StateProps>(mapStateToProps)(Steg4);
