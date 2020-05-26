import * as React from 'react';
import 'moment/locale/nb';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import * as moment from 'moment';
import DocumentTitle from 'react-document-title';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
import Kvittering from 'app/types/services/Kvittering';
import Person from '../../types/domain/Person';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import { Language } from 'intl/IntlProvider';
import 'nav-frontend-lenker-style';

const SpotlightLetter = require('assets/svg/spotlight_letter.svg').default;

import { AppState } from 'reducers/reducers';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';
import KvitteringStatus from './components/KvitteringStatus';
import SeSøknad from './components/SeSøknad';
import Oversikt from './components/Oversikt';

interface StateProps {
    person: Person;
    kvittering: Kvittering;
}

type Props = StateProps & InjectedIntlProps;

class SøknadSendt extends React.Component<StateProps & InjectedIntlProps> {
    constructor(props: Props) {
        super(props);
        moment.locale(Language.BOKMÅL);
    }

    componentDidMount() {
        setTimeout(() => {
            if ((window as any).hj) {
                (window as any).hj('trigger', 'es_kvittering_feedback');
            }
        }, 5000);
    }

    render() {
        const { intl, kvittering, person } = this.props;
        return (
            <>
                <DocumentTitle title={getMessage(intl, 'kvittering.sectionheading')} />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <div className="responsiveContainer">
                    <CustomSVG iconRef={SpotlightLetter} className="spotlightLetter" />
                    <Innholdstittel className="blokk-s">
                        {getMessage(intl, 'kvittering.text.takk')}
                        <span className="capitalizeName"> {person.fornavn.toLowerCase()}!</span>
                    </Innholdstittel>

                    <SeSøknad mottattDato={kvittering.mottattDato} saksNr={kvittering.saksNr} pdf={kvittering.pdf} />
                    <KvitteringStatus />
                    <Oversikt saksNr={kvittering.saksNr} />
                </div>
            </>
        );
    }
}
const mapStateToProps = (state: AppState) => ({
    person: state.apiReducer.person!,
    kvittering: state.apiReducer.kvittering!,
});

export default connect<StateProps>(mapStateToProps)(injectIntl(SøknadSendt));
