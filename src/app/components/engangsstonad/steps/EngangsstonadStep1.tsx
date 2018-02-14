import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';

const Modal = require('nav-frontend-modal').default;

import RadioList, { OptionProps, RadioListChangeEvent, RadioListProps } from 'components/shared/radio-list/RadioList';

import getMessage from 'util/i18n/i18nUtils';
import { soknadActionCreators as soknad } from '../../../redux/actions';

import './../engangsstonad.less';
import RelasjonTilBarn from '../../../types/domain/RelasjonTilBarn';
import { History } from 'history';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Person from '../../../types/domain/Person';

interface StateProps {
    barnErFodt?: boolean;
    relasjonTilBarn: RelasjonTilBarn;
    person: Person;
}

export type Dispatch = (action: any) => any;

export interface DispatchProps {
    dispatch: Dispatch;
}

interface ExternalProps {
    history: History;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & ExternalProps;

interface State {
    isModalOpen: boolean;
}

interface RadioListConfig {
    name: string;
    titleIntlId: string;
    selectedValue?: string;
    options: OptionProps[];
    action: RadioListChangeEvent;
}

export class EngangsstonadStep1 extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props);
        this.handleNextClicked = this.handleNextClicked.bind(this);
        this.fodselTidspunktChange = this.fodselTidspunktChange.bind(this);
        this.setState({ ...state, isModalOpen: false });
        Modal.setAppElement('#app');
    }

    openTerminbekreftelseModal() {
        this.setState({ isModalOpen: true });
    }

    closeTerminbekreftelseModal() {
        this.setState({ isModalOpen: false });
    }

    handleNextClicked(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.history.push('/engangsstonad/step2');
    }

    renderRadioList(config: RadioListConfig) {
        const { intl } = this.props;
        const { titleIntlId, action, options, ...other } = config;
        const title = getMessage(intl, titleIntlId);
        const radioListProps: RadioListProps = {
            title,
            options: options.map((option) => ({ ...option, label: getMessage(intl, option.label) })),
            onChange: action,
            ...other
        };
        return <RadioList {...radioListProps} />;
    }

    fodselTidspunktChange(barnErFodt: string) {
        const { dispatch } = this.props;
        dispatch(soknad.setBarnErFodt(barnErFodt === undefined ? barnErFodt : barnErFodt === 'before'));
    }

    render() {
        const { barnErFodt } = this.props;

        let valgtVerdi;
        if (barnErFodt === true) {
          valgtVerdi = 'before';
        } else if (barnErFodt === false) {
          valgtVerdi = 'ahead';
        }

        const options = [
            { label: 'relasjonBarn.radiobutton.fremtid', value: 'ahead' },
            { label: 'relasjonBarn.radiobutton.fortid', value: 'before' }
        ];

        const fodselTidspunktRadioList = this.renderRadioList({
            titleIntlId: 'relasjonBarn.text.fodselTidspunkt',
            action: (value: string) => this.fodselTidspunktChange(value),
            name: 'fodselTidspunkt',
            selectedValue: valgtVerdi,
            options
        });

        return (
            <div className="engangsstonad">
                <DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
                {fodselTidspunktRadioList}

                {barnErFodt === true && (
                    <div>
                        hei
                    </div>
                )}
            </div>
        );
    }
}

// tslint:disable-next-line no-any
const mapStateToProps = (state: any) => ({
    relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
    barnErFodt: state.soknadReducer.barnErFodt,
    person: state.commonReducer.person
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(EngangsstonadStep1));