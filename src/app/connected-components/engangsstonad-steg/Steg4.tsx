import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
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

interface StateProps {
    bekreftetInformasjon: boolean;
    person: Person;
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn & UfodtBarn;
    annenForelder: AnnenForelder;
    soknadPostResponse: EngangsstonadSoknadResponse;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;
export class Steg4 extends React.Component<Props> {
    render() {
        const { person, intl, dispatch, bekreftetInformasjon } = this.props;
        if (!person) {
            return null;
        }
        return (
            <div>
                <DocumentTitle title="NAV Engangsstønad - Oppsummering" />
                <Veilederinfo>{getMessage(intl, 'oppsummering.text.lesNoye')}</Veilederinfo>
                <PersonaliaLabel
                    navn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn)}
                    personnummer="XXXXXXXXXXX"
                />
                <OppsummeringBarn barn={this.props.barn} />
                <OppsummeringDenAndreForeldren annenForelder={this.props.annenForelder}/>
                <OppsummeringUtenlandsopphold utenlandsopphold={this.props.utenlandsopphold} />

                <ValidGroup
                    validators={[
                        {
                            test: () => (bekreftetInformasjon === true),
                            failText: getMessage(intl, 'valideringsfeil.bekreftOpplysninger')
                        }
                    ]}
                    name="bekreftOpplysninger"
                >
                <BekreftCheckboksPanel
                    name="bekreftOpplysninger"
                    checked={bekreftetInformasjon}
                    onChange={() => dispatch(common.setBekreftetInformasjon(!bekreftetInformasjon))}
                    label={getMessage(intl, 'oppsummering.text.samtykke')}
                />
                </ValidGroup>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => ({
    bekreftetInformasjon: state.commonReducer.bekreftetInformasjon,
    person: state.apiReducer.person,
    barn: state.soknadReducer.barn,
    annenForelder: state.soknadReducer.annenForelder,
    utenlandsopphold: state.soknadReducer.utenlandsopphold,
    soknadPostResponse: state.apiReducer.soknad
});
export default connect<StateProps>(mapStateToProps)(injectIntl(Steg4));
