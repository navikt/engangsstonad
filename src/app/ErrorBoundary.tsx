import React from 'react';
import * as Sentry from '@sentry/browser';
import GenerellFeil from './connected-components/feilsider/GenerellFeil';

interface State {
    eventId: string | null;
    hasError: boolean;
}

class ErrorBoundary extends React.Component<unknown, State> {
    constructor(props: any) {
        super(props);
        this.state = { eventId: null, hasError: false };
    }

    componentDidCatch(error: Error | null, errorInfo: any) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <GenerellFeil />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
