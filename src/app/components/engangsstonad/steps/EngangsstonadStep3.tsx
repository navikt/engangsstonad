import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';
import BekreftCheckbox from 'shared/bekreft-checkbox/BekreftCheckbox';
import DialogBox from 'shared/dialog-box/DialogBox';
import { fullNameFormat } from 'util/formats/formatUtils';
import PersonaliaLabel from 'shared/personalia-label/PersonaliaLabel';
import { commonActionCreators as common } from '../../../redux/actions';
import getMessage from '../../../util/i18n/i18nUtils';

import Person from '../../../types/domain/Person';
import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from '../../../types/domain/RelasjonTilBarn';
import { DispatchProps } from 'app/redux/types';
import Medlemsskap from '../../../types/domain/Medlemsskap';
import { EngangsstonadSoknadResponse } from '../../../types/services/EngangsstonadSoknadResponse';
import '../engangsstonad.less';
import OppsummeringRelasjonTilBarn from 'components/oppsummering/OppsummeringRelasjonTilBarn';
import OppsummeringMedlemskap from 'components/oppsummering/OppsummeringMedlemskap';
const { ValidGroup } = require('./../../../lib') as any;

interface StateProps {
    bekreftetInformasjon: boolean;
    person: Person;
    medlemsskap: Medlemsskap;
    relasjonTilBarn: RelasjonTilFodtBarn & RelasjonTilUfodtBarn;
    barnErFodt?: boolean;
    soknadPostResponse: EngangsstonadSoknadResponse;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;
export class Step3 extends React.Component<Props> {
    render() {
        const { person, intl, dispatch, bekreftetInformasjon } = this.props;
        if (!person) {
            return null;
        }
        return (
            <div>
                <DocumentTitle title="NAV Engangsstønad - Oppsummering" />
                <DialogBox type="info" overflow={false}>
                    <Normaltekst>{getMessage(intl, 'oppsummering.text.lesNoye')}</Normaltekst>
                </DialogBox>
                <PersonaliaLabel
                    navn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn)}
                    personnummer="XXXXXXXXXXX"
                />
                <OppsummeringRelasjonTilBarn
                    barnErFodt={this.props.barnErFodt}
                    relasjonTilBarn={this.props.relasjonTilBarn}
                />
                <OppsummeringMedlemskap medlemsskap={this.props.medlemsskap}/>

                <ValidGroup
                    validators={[
                        {test: () => (bekreftetInformasjon === true), failText: 'Du må bekrefte at informasjonen stemmer'}
                    ]}
                    name="bekreftOpplysninger"
                >
                <BekreftCheckbox
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
    medlemsskap: state.soknadReducer.medlemsskap,
    relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
    barnErFodt: state.soknadReducer.barnErFodt,
    soknadPostResponse: state.apiReducer.soknad
});
export default connect<StateProps>(mapStateToProps)(injectIntl(Step3));
