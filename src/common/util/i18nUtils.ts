import { IntlShape } from "react-intl";

const getMessage = (
    intl: IntlShape,
    id: string,
    value?: { [key: string]: string | number }
): string => intl.formatMessage({ id }, value);

export default getMessage;
