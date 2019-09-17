import React from 'react';
import * as countries from 'i18n-iso-countries';
import * as Sentry from '@sentry/browser';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

interface State {
    eventId: string | null;
}

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = { eventId: null };
    }

    componentDidCatch(error: Error | null, errorInfo: object) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
