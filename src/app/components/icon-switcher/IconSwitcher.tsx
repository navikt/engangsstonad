import * as React from 'react';

type Props = {
    icons: React.ReactNode[],
    onClick: () => void
};

type State = {
    activeIconIndex: number
};

export default class IconSwitcher extends React.Component<Props, State> {
    componentWillMount() {
        this.setState({
            activeIconIndex: 0
        });

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    updateActiveIndex() {
        const { icons } = this.props;
        const { activeIconIndex } = this.state;

        if (activeIconIndex >= icons.length - 1) {
            return this.setState({ activeIconIndex: 0 });
        }
        return this.setState({ activeIconIndex: activeIconIndex + 1 });
    }

    handleOnClick() {
        this.updateActiveIndex();
        this.props.onClick();
    }

    render() {
        const { icons } = this.props;
        const { activeIconIndex } = this.state;

        return (
            <div className="iconSwitcher" role="presentation" onClick={this.handleOnClick}>
                {icons[activeIconIndex]}
            </div>
        );
    }
}
