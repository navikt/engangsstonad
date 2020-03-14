import { IntlShape } from "react-intl";
import { FormikProps } from "formik";
import { FormProps } from "./FormProps";
import { Language } from "intl/IntlProvider";

export default interface StegProps {
    formikProps: FormikProps<Partial<FormProps>>;
    language: Language;
    intl: IntlShape;
}