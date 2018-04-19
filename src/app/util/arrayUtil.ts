export const containsDifferentValues = (array: any[]): boolean => {
    return (new Set(array)).size > 1;
};
