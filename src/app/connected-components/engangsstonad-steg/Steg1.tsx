import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
const { Select } = require('nav-frontend-skjema');
import RadioPanelGruppeResponsive from './../../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { soknadActionCreators as soknad } from '../../redux/actions';
import { default as Barn, FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import '../../styles/engangsstonad.less';
import { steg1Partials } from './partials';
import FormBlock from 'components/form-block/FormBlock';
import LabelText from 'common/components/labeltekst/Labeltekst';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import { AppState } from 'reducers/reducers';

interface StateProps {
    barn: Barn;
}

type Props = StateProps & DispatchProps;

const Steg1: React.FunctionComponent<Props> = ({ barn, dispatch }) => {
    const intl = useIntl();
    const getFodselsTidspunktSelectedValue = () => {
        if (barn) {
            const { erBarnetFødt } = barn;
            if (erBarnetFødt === true) {
                return 'before';
            } else if (erBarnetFødt === false) {
                return 'ahead';
            }
        }
        return undefined;
    };

    const getAntallBarnSelectedValue = () => {
        if (barn) {
            const { antallBarn } = barn;
            if (antallBarn === 1) {
                return 'ett';
            } else if (antallBarn === 2) {
                return 'tvillinger';
            } else if (antallBarn && antallBarn >= 3) {
                return 'flere';
            }
        }
        return undefined;
    };

    const renderPartial = () => {
        if (barn.erBarnetFødt === true) {
            return <steg1Partials.FødtBarnPartial barn={barn as FodtBarn} dispatch={dispatch} />;
        } else if (barn.erBarnetFødt === false) {
            return <steg1Partials.UfødtBarnPartial barn={barn as UfodtBarn} dispatch={dispatch} />;
        }
        return null;
    };

    const handleAntallBarnSelected = (value: string) => {
        if (value === 'ett') {
            dispatch(soknad.setAntallBarn(1));
        } else if (value === 'tvillinger') {
            dispatch(soknad.setAntallBarn(2));
        } else {
            dispatch(soknad.setAntallBarn(3));
        }
    };

    return (
        <Skjemasteg tittel={getMessage(intl, 'relasjonBarn.sectionheading')}>
            <FormBlock>
                <RadioPanelGruppeResponsive
                    legend={getMessage(intl, 'relasjonBarn.text.fodselTidspunkt')}
                    name="fodselsTidspunkt"
                    onChange={(event: any, value: string) => dispatch(soknad.setErBarnetFødt(value))}
                    checked={getFodselsTidspunktSelectedValue()}
                    radios={[
                        {
                            inputProps: { id: 'js-fodselFremtid' },
                            label: getMessage(intl, 'relasjonBarn.radiobutton.fremtid'),
                            value: 'ahead',
                        },
                        {
                            inputProps: { id: 'js-fodselFortid' },
                            label: getMessage(intl, 'relasjonBarn.radiobutton.fortid'),
                            value: 'before',
                        },
                    ]}
                />
            </FormBlock>
            <FormBlock visible={barn.erBarnetFødt !== undefined}>
                <RadioPanelGruppeResponsive
                    legend={getMessage(intl, `relasjonBarn.text.antallBarn${barn.erBarnetFødt ? 'Født' : 'Ventet'}`)}
                    name="antallBarn"
                    onChange={(event: any, value: string) => handleAntallBarnSelected(value)}
                    checked={getAntallBarnSelectedValue()}
                    radios={[
                        {
                            inputProps: { id: 'js-ettBarn' },
                            label: getMessage(intl, 'relasjonBarn.radiobutton.ettbarn'),
                            value: 'ett',
                        },
                        {
                            inputProps: { id: 'js-tvillinger' },
                            label: getMessage(intl, 'relasjonBarn.radiobutton.tvillinger'),
                            value: 'tvillinger',
                        },
                        {
                            inputProps: { id: 'js-flereBarn' },
                            label: getMessage(intl, 'relasjonBarn.radiobutton.flere'),
                            value: 'flere',
                        },
                    ]}
                />
            </FormBlock>
            <FormBlock visible={barn.antallBarn !== undefined && barn.antallBarn > 2}>
                <Select
                    bredde="xs"
                    label={<LabelText intlId="relasjonBarn.text.antallBarn" />}
                    onChange={(e: any) => dispatch(soknad.setAntallBarn(e.target.value))}
                    value={barn.antallBarn}
                >
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                </Select>
            </FormBlock>
            {renderPartial()}
        </Skjemasteg>
    );
};
const mapStateToProps = (state: AppState) => ({
    barn: state.soknadReducer.barn,
});

export default connect<StateProps, {}, {}>(mapStateToProps)(Steg1);
