import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

const { BekreftCheckboksPanel } = require('nav-frontend-skjema');
import Veilederinfo from 'components/veileder-info/Veilederinfo';
import PersonaliaLabel from 'components/personalia-label/PersonaliaLabel';

import { fullNameFormat } from 'util/formats/formatUtils';
import { commonActionCreators as common } from '../../redux/actions';
import getMessage from '../../util/i18n/i18nUtils';

import Person from 'app/types/domain/Person';
import { FodtBarn, UfodtBarn } from 'app/types/domain/Barn';
import AnnenForelder from 'app/types/domain/AnnenForelder';
import { DispatchProps } from 'app/redux/types';
import Utenlandsopphold from 'app/types/domain/Utenlandsopphold';

import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';
import OppsummeringBarn from './../oppsummering/BarnOppsummering';
import OppsummeringDenAndreForeldren from './../oppsummering/AndreForeldrenOppsummering';
import OppsummeringUtenlandsopphold from './../oppsummering/UtenlandsoppholdOppsummering';

const { ValidGroup } = require('./../../lib') as any;

import '../../styles/engangsstonad.less';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import { Attachment } from 'storage/attachment/types/Attachment';

interface StateProps {
    bekreftetInformasjon: boolean;
    person: Person;
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn & UfodtBarn;
    vedlegg: Attachment[];
    annenForelder: AnnenForelder;
    soknadPostResponse: EngangsstonadSoknadResponse;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class Steg4 extends React.Component<Props> {
    componentDidMount() {
        setTimeout(() => (window as any).hj('vpv', '/engangsstonad/soknad/step-4'), 5000);
    }

    render() {
        const { person, barn, intl, dispatch, bekreftetInformasjon } = this.props;
        if (!person) {
            return null;
        }

        return (
            <Skjemasteg tittel={getMessage(intl, 'oppsummering.sectionheading')}>
                <div className="blokk-m">
                    <Veilederinfo>{getMessage(intl, 'oppsummering.text.lesNoye')}</Veilederinfo>
                </div>
                <div className="blokk-m">
                    <PersonaliaLabel
                        navn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn).toLowerCase()}
                        personnummer={person.fnr}
                    />
                </div>
                <OppsummeringBarn barn={barn} vedlegg={this.props.vedlegg} />
                {Object.keys(this.props.annenForelder).length > 0 && <OppsummeringDenAndreForeldren annenForelder={this.props.annenForelder} />}
                <OppsummeringUtenlandsopphold utenlandsopphold={this.props.utenlandsopphold} erBarnetFødt={barn.erBarnetFødt} />
                <div className="blokk-m">
                    <div className="es-skjema__feilomrade--ingenBakgrunnsfarge">
                        <ValidGroup
                            validators={[
                                {
                                    test: () => bekreftetInformasjon === true,
                                    failText: getMessage(intl, 'valideringsfeil.bekreftOpplysninger')
                                }
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
    }
}
const mapStateToProps = (state: any) => ({
    bekreftetInformasjon: state.commonReducer.bekreftetInformasjon,
    person: state.apiReducer.person,
    barn: state.soknadReducer.barn,
    vedlegg: state.attachmentReducer,
    annenForelder: state.soknadReducer.annenForelder,
    utenlandsopphold: state.soknadReducer.utenlandsopphold,
    soknadPostResponse: state.apiReducer.soknad
});
export default connect<StateProps>(mapStateToProps)(injectIntl(Steg4));
