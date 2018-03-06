import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';
const { RadioPanelGruppe } = require('nav-frontend-skjema');
import { soknadActionCreators as soknad } from '../../redux/actions';
import { default as Barn } from '../../types/domain/Barn';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Person from '../../types/domain/Person';
import { DispatchProps } from '../../redux/types';
import getMessage from 'util/i18n/i18nUtils';
import '../../styles/engangsstonad.less';
import { steg1Partials } from './partials';

interface StateProps {
    barn: Barn;
    person: Person;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

interface State {
    isModalOpen: boolean;
}

export class Steg1 extends React.Component<Props, State> {
    getFodselsTidspunktSelectedValue() {
        const { barn } = this.props;
        if (barn) {
            const { erBarnetFødt } = barn;
            if (erBarnetFødt === true) {
                return 'before';
            } else if (erBarnetFødt === false) {
                return 'ahead';
            }
        }
        return undefined;

    }

    getAntallBarnSelectedValue() {
        const { barn } = this.props;
        if (barn) {
            const { antallBarn } = barn;
            if (antallBarn === 1) {
                return 'ett';
            } else if (antallBarn === 2) {
                return 'tvillinger';
            } else if (antallBarn === 3) {
                return 'flere';
            }
        }
        return undefined;
    }

    renderPartial() {
        const { barn, intl, dispatch } = this.props;
        if (barn.erBarnetFødt === true) {
            return <steg1Partials.FødtBarnPartial barn={barn} intl={intl} dispatch={dispatch} />;
        } else if (barn.erBarnetFødt === false) {
            return <steg1Partials.UfødtBarnPartial barn={barn} intl={intl} dispatch={dispatch} />;
        }
        return null;
    }

    render() {
        const { barn, dispatch, intl } = this.props;

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
                <RadioPanelGruppe
                    legend={getMessage(intl, 'relasjonBarn.text.fodselTidspunkt')}
                    name="fodselsTidspunkt"
                    onChange={(event: any, value: string) => dispatch(soknad.setErBarnetFødt(value))}
                    checked={this.getFodselsTidspunktSelectedValue()}
                    radios={[
                        {label: getMessage(intl, 'relasjonBarn.radiobutton.fremtid'), value: 'ahead'},
                        {label: getMessage(intl, 'relasjonBarn.radiobutton.fortid'), value: 'before'}
                    ]}
                />

                {barn.erBarnetFødt !== undefined && (
                    <RadioPanelGruppe
                        legend={getMessage(intl, `relasjonBarn.text.antallBarn${barn.erBarnetFødt ? 'Født' : 'Ventet'}`)}
                        name="antallBarn"
                        onChange={(event: any, value: string) => dispatch(soknad.setAntallBarn(value))}
                        checked={this.getAntallBarnSelectedValue()}
                        radios={[
                            {label: getMessage(intl, 'relasjonBarn.radiobutton.ettbarn'), value: 'ett'},
                            {label: getMessage(intl, 'relasjonBarn.radiobutton.tvillinger'), value: 'tvillinger'},
                            {label: getMessage(intl, 'relasjonBarn.radiobutton.flere'), value: 'flere'}
                        ]}
                    />
                )}

                {this.renderPartial()}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    barn: state.soknadReducer.barn,
    person: state.commonReducer.person
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(Steg1));