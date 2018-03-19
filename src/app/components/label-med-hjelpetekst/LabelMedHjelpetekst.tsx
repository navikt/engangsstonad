import * as React from 'react';
import * as classnames from 'classnames';
import CustomSVG from './../custom-svg/CustomSVG';
const { Collapse } = require('react-collapse');
const InfoIkon = require('./../../assets/svg/info_ikon.svg').default;
const LukkInfoIkon = require('./../../assets/svg/lukk_info_ikon.svg').default;

const InfoIkonSVG = <CustomSVG iconRef={InfoIkon} size={14} />;
const LukkInfoIkonSVG = <CustomSVG iconRef={LukkInfoIkon} size={14} />;

import './labelMedHjelpetekst.less';
import Sirkelknapp from 'components/sirkelknapp/Sirkelknapp';

type Props = {
    label: string;
    hjelpetekst: string;
};

type State = {
    showHjelpetekst: boolean;
};

export default class LabelMedHjelpetekst extends React.Component<Props, State> {
    componentWillMount() {
        this.setState({
            showHjelpetekst: false
        });

        this.toggleHjelpetekst = this.toggleHjelpetekst.bind(this);
    }

    toggleHjelpetekst() {
        this.setState({ showHjelpetekst: !this.state.showHjelpetekst });
    }

    render() {
        const { label, hjelpetekst } = this.props;
        const { showHjelpetekst } = this.state;

        return (
            <span className="labelMedHjelpetekst">
                <b>{label}</b>
                <Sirkelknapp
                    stil="info"
                    label="testlabel"
                    ikon={showHjelpetekst ? LukkInfoIkonSVG : InfoIkonSVG}
                    toggle={{ pressed: showHjelpetekst }}
                    onClick={this.toggleHjelpetekst}
                />
                <Collapse
                    className={classnames('hjelpetekst', { 'hjelpetekst--open': showHjelpetekst })}
                    isOpened={showHjelpetekst}
                    springConfig={{ stiffness: 250, damping: 30 }}
                >
                    <div className="hjelpetekst__wrapper">
                        {hjelpetekst}
                    </div>
                </Collapse>
            </span>
        );
    }
}
