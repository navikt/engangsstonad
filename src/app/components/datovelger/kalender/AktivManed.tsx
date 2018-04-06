import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';

export interface Props {
    date: Date;
    locale: string;
    localeUtils: LocaleUtils;
}

const lagCaption = (props: Props) => props.localeUtils.formatMonthTitle(props.date, props.locale);

export class AktivManed extends React.Component<Props, {}> {
    shouldComponentUpdate(nextProps: any) {
        return lagCaption(nextProps) !== lagCaption(this.props);
    }
    render() {
        return (
            <div className="DayPicker-Caption" role="presentation">
                {lagCaption(this.props)}
                <div>
                    <button>sdf</button>
                </div>
            </div>
        );
    }
}

export default AktivManed;
