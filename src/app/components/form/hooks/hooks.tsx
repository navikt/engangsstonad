import * as React from 'react';

export const visibilityHook = (updateVisibility: React.Dispatch<React.SetStateAction<{}>>, name: string) => {
    React.useEffect(() => {
        updateVisibility({ [name]: true });
        return () => updateVisibility({ [name]: false });
    }, []);
};
