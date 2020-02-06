
export const intlPrefix = (value: string) => {
    return `spørsmål.${value}`;
};

export const getPlaceholder = (value: string): string => {
    return intlPrefix(value).concat(".placeholder");
};
