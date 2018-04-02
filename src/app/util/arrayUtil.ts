export const containsUnlikeValues = (array: any[]): boolean => {
    return (new Set(array)).size > 1;
};
