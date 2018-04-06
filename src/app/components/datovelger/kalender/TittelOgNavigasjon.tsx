import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';

export interface Props {
    date: Date;
    localeUtils: LocaleUtils;
    locale: string;
    navbar?: React.ReactNode;
}

const lagCaption = (props: Props) => props.localeUtils.formatMonthTitle(props.date, props.locale);

export class TittelOgNavigasjon extends React.Component<Props, {}> {
    shouldComponentUpdate(nextProps: any) {
        return lagCaption(nextProps) !== lagCaption(this.props);
    }
    render() {
        return (
            <div className="DayPicker-Caption">
                <span aria-live="assertive">{lagCaption(this.props)}</span>
                {this.props.navbar && this.props.navbar}
            </div>
        );
    }
}

export default TittelOgNavigasjon;
