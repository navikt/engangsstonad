export const prettyNameFormat = (fornavn: string, mellomnavn?: string, etternavn?: string): string => {
    fornavn = fornavn.toLowerCase();
    fornavn = fornavn.charAt(0).toUpperCase() + fornavn.slice(1);
    let formattedName = fornavn;
    if (mellomnavn) {
        mellomnavn = mellomnavn.toLowerCase();
        mellomnavn = mellomnavn.charAt(0).toUpperCase() + mellomnavn.slice(1);
        formattedName = formattedName.concat(' ').concat(mellomnavn);
    }
    
    if (etternavn) {
        etternavn = etternavn.toLowerCase();
        etternavn = etternavn.charAt(0).toUpperCase() + etternavn.slice(1);
        formattedName = formattedName.concat(' ').concat(etternavn);
    }
    return formattedName;
};

export default {
    prettyNameFormat
};
