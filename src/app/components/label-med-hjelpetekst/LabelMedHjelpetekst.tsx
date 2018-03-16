import * as React from 'react';
import IconSwitcher from './../icon-switcher/IconSwitcher';
import CustomSVG from './../custom-svg/CustomSVG';
const { Collapse } = require('react-collapse');
const InfoIkon = require('./../../assets/svg/info_ikon.svg').default;
const LukkInfoIkon = require('./../../assets/svg/lukk_info_ikon.svg').default;

const InfoIkonSVG = <CustomSVG iconRef={InfoIkon} size={14} />;
const LukkInfoIkonSVG = <CustomSVG iconRef={LukkInfoIkon} size={14} />;

import './labelMedHjelpetekst.less';

type Props = {
    label: React.ReactNode;
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
                {label}
                <IconSwitcher
                    icons={[InfoIkonSVG, LukkInfoIkonSVG]}
                    onClick={this.toggleHjelpetekst}
                />

                {
                    showHjelpetekst &&
                    <Collapse
                        className="hjelpetekst"
                        isOpened={showHjelpetekst}
                        springConfig={{ stiffness: 250, damping: 30 }}
                        style={{height: 'auto'}}
                    >
                        {hjelpetekst}
                    </Collapse>
                }
            </span>
        );
    }
}
