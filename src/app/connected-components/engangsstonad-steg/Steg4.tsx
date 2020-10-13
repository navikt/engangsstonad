import React from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { commonActionCreators as common } from '../../redux/actions';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Oppsummering from '../oppsummering/Oppsummering';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import '../../styles/engangsstonad.less';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'components/veileder/Veileder';
import { AppState } from 'reducers/reducers';

const { ValidGroup } = require('./../../lib') as any;

interface StateProps {
    bekreftetInformasjon: boolean;
}

type Props = StateProps & DispatchProps;

const Steg4: React.FunctionComponent<Props> = ({ dispatch, bekreftetInformasjon }) => {
    const intl = useIntl();
    return (
        <Skjemasteg tittel={getMessage(intl, 'oppsummering.sectionheading')}>
            <div className="blokk-m">
                <Veilederpanel kompakt={true} svg={<Veileder />}>
                    {getMessage(intl, 'oppsummering.text.lesNoye')}
                </Veilederpanel>
            </div>
            <Oppsummering />
            <div className="blokk-m">
                <div className="es-skjema__feilomrade--ingenBakgrunnsfarge">
                    <ValidGroup
                        validators={[
                            {
                                test: () => bekreftetInformasjon === true,
                                failText: getMessage(intl, 'valideringsfeil.bekreftOpplysninger'),
                            },
                        ]}
                        name="bekreftOpplysninger"
                    >
                        <BekreftCheckboksPanel
                            inputProps={{ name: 'bekreftOpplysninger' }}
                            checked={bekreftetInformasjon}
                            onChange={() => dispatch(common.setBekreftetInformasjon(!bekreftetInformasjon))}
                            label={getMessage(intl, 'oppsummering.text.samtykke')}
                        />
                    </ValidGroup>
                </div>
            </div>
        </Skjemasteg>
    );
};

const mapStateToProps = (state: AppState) => ({
    bekreftetInformasjon: state.commonReducer.bekreftetInformasjon,
});

export default connect<StateProps>(mapStateToProps)(Steg4);
