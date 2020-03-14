export const visibilityHook = (
    status: object,
    setStatus: (status?: any) => void,
    name: string,
    parent: string | string
) => {
    setStatus({ ...status, [name]: { visible: true, root: parent === 'NO_PARENT' } });
    return () => setStatus(() => ({ ...status, [name]: { visible: false } }));
};
