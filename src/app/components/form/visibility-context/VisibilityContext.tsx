import * as React from 'react';

type VisibleComponents = { [key: string]: boolean };

interface State {
    visibleComponents: VisibleComponents;
}

export const VisibilityContext = React.createContext({ visibleComponents: {}, updateVisibility: (props?: any) => {} });

class VisibilityContextProvider extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            visibleComponents: {}
        };
    }

    updateVisibility = (visibility: any) => {
        this.setState((prevState: State) => ({ visibleComponents: { ...this.state.visibleComponents, ...visibility } }));
    };

    render() {
        return (
            <VisibilityContext.Provider
                value={{ visibleComponents: this.state.visibleComponents, updateVisibility: this.updateVisibility }}
            >
                {this.props.children}
            </VisibilityContext.Provider>
        );
    }
}
export default VisibilityContextProvider;
