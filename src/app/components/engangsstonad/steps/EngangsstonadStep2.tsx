import * as React from 'react';
import DocumentTitle from 'react-document-title';
import renderRadioList from 'util/render/renderUtils';
import getMessage from 'util/i18n/i18nUtils';
import { soknadActionCreators as soknad } from '../../../redux/actions';
import {default as Medlemsskap, Utenlandsopphold} from '../../../types/domain/Medlemsskap';
import injectIntl = ReactIntl.injectIntl;
import { connect } from 'react-redux';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { DispatchProps } from '../../../redux/types/index';
import { ExternalProps } from '../../../types/index';
import CountryPicker from './../../shared/country-picker/CountryPicker';

interface StateProps {
    medlemsskap: Medlemsskap;
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & ExternalProps;

export class EngangsstonadStep2 extends React.Component<Props> {
    render() {
        const { dispatch, intl, medlemsskap, language } = this.props;
        const { iNorgeSiste12, iNorgeNeste12, utenlandsopphold } = medlemsskap;

        const iNorgeSiste12RadioList = renderRadioList({
            intl,
            titleIntlId: getMessage(intl, 'medlemmskap.text.siste12mnd'),
            action: (value: string) => dispatch(soknad.setINorgeSiste12(value)),
            name: 'iNorgeSiste12',
            options: [
                { labelIntlId: 'medlemmskap.radiobutton.boddNorge', value: 'norway' },
                { labelIntlId: 'medlemmskap.radiobutton.utlandet', value: 'abroad' }
            ]
        });

        const iNorgeNeste12RadioList = renderRadioList({
            intl,
            titleIntlId: getMessage(intl, 'medlemmskap.text.neste12mnd'),
            action: (value: string) => dispatch(soknad.setINorgeNeste12(value)),
            name: 'iNorgeNeste12',
            options: [
                { labelIntlId: 'medlemmskap.radiobutton.boNorge', value: 'norway' },
                { labelIntlId: 'medlemmskap.radiobutton.boUtlandet', value: 'abroad' }
            ]
        });

        const fodselINorgeRadioList = renderRadioList({
            intl,
            titleIntlId: getMessage(intl, 'medlemmskap.text.bostedFodsel'),
            action: (value: string) => dispatch(soknad.setFodselINorge(value)),
            name: 'fodselINorge',
            options: [
                { labelIntlId: 'medlemmskap.radiobutton.vareNorge', value: 'norway' },
                { labelIntlId: 'medlemmskap.radiobutton.vareUtlandet', value: 'abroad' }
            ]
        });

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
                {iNorgeSiste12RadioList}
                {medlemsskap.iNorgeSiste12 === false && (
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegBodde')}
                        language={language}
                        visits={medlemsskap.utenlandsopphold}
                        addVisit={(u: Utenlandsopphold) => dispatch(soknad.addUtenlandsopphold(u))}
                        editVisit={(u: Utenlandsopphold, i: number) => dispatch(soknad.editUtenlandsopphold(u, i))}
                        deleteVisit={(u: Utenlandsopphold) => dispatch(soknad.deleteUtenlandsopphold(u))}
                    />
                )}
                {(iNorgeSiste12 || utenlandsopphold.length > 0) && iNorgeNeste12RadioList}
                {iNorgeNeste12 !== undefined && fodselINorgeRadioList}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    medlemsskap: state.soknadReducer.medlemsskap,
    language: state.commonReducer.language
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(EngangsstonadStep2));