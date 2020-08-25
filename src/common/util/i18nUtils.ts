import { InjectedIntl, MessageValue } from 'react-intl';

const getMessage = (intl: InjectedIntl, id: string, value?: { [key: string]: MessageValue }): string =>
    intl.formatMessage({ id }, value);

export default getMessage;
