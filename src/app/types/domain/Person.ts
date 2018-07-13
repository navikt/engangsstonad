import Bankkonto from './Bankkonto';

type Person = {
    fnr: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    adresse: string;
    kjønn: string;
    fødselsdato: string;
    ikkeNordiskEøsLand: boolean;
    bankkonto?: Bankkonto;
};

export default Person;
