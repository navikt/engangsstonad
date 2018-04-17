import * as React from 'react';

interface Props {
    loc: string;
}

class Redirect extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    
    componentWillMount() {
        (window as any).location = this.props.loc;
    }

    render() {
        return null;
    }
}
export default Redirect;
