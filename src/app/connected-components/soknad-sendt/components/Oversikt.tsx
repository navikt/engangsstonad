import React from 'react';
import { FormattedMessage } from 'react-intl';
import EtikettBase from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel, EtikettLiten, Ingress, Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import './oversikt.less';
import FormBlock from 'components/form-block/FormBlock';
import { lenker } from 'util/lenker';
const cls = BEMHelper('oversikt');
interface Props {
    saksNr: string;
}
const Oversikt: React.StatelessComponent<Props> = ({ saksNr }) => {
    return (
        <FormBlock>
            <FormBlock margin="xs">
                <Systemtittel>
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Systemtittel>
            </FormBlock>
            <LenkepanelBase href={lenker.foreldrepenger} border={true} className="statusBoks__lenkepanel">
                <div className={cls.className}>
                    <div className={cls.element('left')}>
                        <FormBlock margin="xs">
                            <Undertittel>
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Undertittel>
                        </FormBlock>
                        <EtikettBase type="fokus">
                            <FormattedMessage id="søknadSendt.status.status" />
                        </EtikettBase>
                    </div>
                    {saksNr && (
                        <div className={cls.element('right')}>
                            <EtikettLiten>
                                <FormattedMessage id="søknadSendt.status.saksnummer" />
                            </EtikettLiten>
                            <Ingress>{saksNr}</Ingress>
                        </div>
                    )}
                </div>
            </LenkepanelBase>
        </FormBlock>
    );
};
export default Oversikt;
