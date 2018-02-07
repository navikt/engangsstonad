export enum ArbeidSiste12 {
    ArbeidetINorge = 'ARBEIDET_I_NORGE',
    ArbeidetIUtlandet = 'ARBEIDET_I_UTLANDET'
}

type UtenlandsoppholdVarighet = {
    fom: string;
    tom: string;
};

export type Utenlandsopphold = {
    land: string;
    varighet: UtenlandsoppholdVarighet;
};

type Medlemsskap = {
    iNorgeSiste12: boolean;
    arbeidSiste12: ArbeidSiste12;
    fodselINorge: boolean;
    iNorgeNeste12: true;
    utenlandsopphold: Utenlandsopphold[];
};

export default Medlemsskap;
