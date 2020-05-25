import React from 'react';
import BEMHelper from '../../../../common/util/bem';
import './kvitteringStatus.less';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import FormBlock from 'components/form-block/FormBlock';
import StatusIkon from 'components/status-ikon/StatusIkon';

const KvitteringStatus: React.StatelessComponent = () => {
    const cls = BEMHelper('kvitteringStatus');
    return (
        <div className={cls.className}>
            <div className={cls.element('suksess')}>
                <div className={cls.element('ikon')}>
                    <StatusIkon status="suksess" />
                </div>
                <div className={cls.element('tekst')}>
                    <FormBlock margin="xxs">
                        <Undertittel>
                            <FormattedMessage id="søknadSendt.kvitteringStatus.tittel" />
                        </Undertittel>
                    </FormBlock>
                    <div>
                        <Normaltekst>
                            <FormattedMessage id="søknadSendt.kvitteringStatus.innhold" />
                        </Normaltekst>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default KvitteringStatus;
