export enum ArbeidSiste12 {
    ArbeidetINorge = 'ARBEIDET_I_NORGE',
    ArbeidetIUtlandet = 'ARBEIDET_I_UTLANDET'
}

type Medlemsskap = {
    iNorgeSiste12: boolean;
    arbeidSiste12: ArbeidSiste12;
    fodselINorge: boolean;
    iNorgeNeste12: true;
}

export default Medlemsskap;
