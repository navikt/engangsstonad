import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { commonActionCreators as common } from '../../redux/actions';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from '../../util/i18n/i18nUtils';
import Oppsummering from '../oppsummering/Oppsummering';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import Veilederinfo from 'components/veileder-info/Veilederinfo';
import '../../styles/engangsstonad.less';

const { ValidGroup } = require('./../../lib') as any;

interface StateProps {
    bekreftetInformasjon: boolean;
    vedlegg: Attachment[];
    soknadPostResponse: EngangsstonadSoknadResponse;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class Steg4 extends React.Component<Props> {
    componentDidMount() {
        setTimeout(() => (window as any).hj('vpv', '/engangsstonad/soknad/step-4'), 5000);
    }

    render() {
        const { intl, dispatch, bekreftetInformasjon } = this.props;

        return (
            <Skjemasteg tittel={getMessage(intl, 'oppsummering.sectionheading')}>
                <div className="blokk-m">
                    <Veilederinfo ikon="veileder">
                        {getMessage(intl, 'oppsummering.text.lesNoye')}
                    </Veilederinfo>
                </div>
                <Oppsummering />
                <div className="blokk-m">
                    <div className="es-skjema__feilomrade--ingenBakgrunnsfarge">
                        <ValidGroup
                            validators={[
                                {
                                    test: () => bekreftetInformasjon === true,
                                    failText: getMessage(
                                        intl,
                                        'valideringsfeil.bekreftOpplysninger'
                                    ),
                                },
                            ]}
                            name="bekreftOpplysninger"
                        >
                            <BekreftCheckboksPanel
                                inputProps={{ name: 'bekreftOpplysninger' }}
                                checked={bekreftetInformasjon}
                                onChange={() =>
                                    dispatch(common.setBekreftetInformasjon(!bekreftetInformasjon))
                                }
                                label={getMessage(intl, 'oppsummering.text.samtykke')}
                            />
                        </ValidGroup>
                    </div>
                </div>
            </Skjemasteg>
        );
    }
}

const mapStateToProps = (state: any) => ({
    bekreftetInformasjon: state.commonReducer.bekreftetInformasjon,
    vedlegg: state.attachmentReducer,
    soknadPostResponse: state.apiReducer.soknad,
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Steg4));
