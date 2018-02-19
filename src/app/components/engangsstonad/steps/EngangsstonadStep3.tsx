import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import BekreftCheckbox from 'shared/bekreft-checkbox/BekreftCheckbox';
import DialogBox from 'shared/dialog-box/DialogBox';
import { fullNameFormat } from 'util/formats/formatUtils';
import PersonaliaLabel from 'shared/personalia-label/PersonaliaLabel';
import { apiActionCreators as api, commonActionCreators as common } from '../../../redux/actions';
import getMessage from '../../../util/i18n/i18nUtils';

import Person from '../../../types/domain/Person';
import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from '../../../types/domain/RelasjonTilBarn';
import { ExternalProps } from '../../../types/index';
import { DispatchProps } from 'app/redux/types';
import Medlemsskap from '../../../types/domain/Medlemsskap';
import { EngangsstonadSoknadResponse } from '../../../types/services/EngangsstonadSoknadResponse';
import '../engangsstonad.less';
import OppsummeringRelasjonTilBarn from 'components/oppsummering/OppsummeringRelasjonTilBarn';
import OppsummeringMedlemskap from 'components/oppsummering/OppsummeringMedlemskap';

interface StateProps {
    bekreftetInformasjon: boolean;
    person: Person;
    medlemsskap: Medlemsskap;
    relasjonTilBarn: RelasjonTilFodtBarn & RelasjonTilUfodtBarn;
    barnErFodt?: boolean;
    soknadPostResponse: EngangsstonadSoknadResponse;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & ExternalProps;
export class Step3 extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleNextClicked = this.handleNextClicked.bind(this);
    }

    componentWillReceiveProps(props: Props) {
        if (props.soknadPostResponse) {
            this.props.history.push('/engangsstonad/completed');
        }
    }

    handleNextClicked(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        const { dispatch, medlemsskap, relasjonTilBarn } = this.props;
        dispatch(api.sendSoknad({ medlemsskap, relasjonTilBarn }));
    }

    render() {
        const { person, bekreftetInformasjon, intl, dispatch } = this.props;
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

                <BekreftCheckbox
                    name="bekreftOpplysninger"
                    checked={this.props.bekreftetInformasjon}
                    onChange={() => dispatch(common.setBekreftetInformasjon(!this.props.bekreftetInformasjon))}
                    label={getMessage(intl, 'oppsummering.text.samtykke')}
                />
                <div className="engangsstonad__centerButton">
                    <Hovedknapp onClick={this.handleNextClicked} disabled={!bekreftetInformasjon}>
                        {getMessage(intl, 'standard.sectionheading.sendSoknad')}
                    </Hovedknapp>
                </div>
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
