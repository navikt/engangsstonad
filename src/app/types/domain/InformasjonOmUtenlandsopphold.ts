export type Utenlandsopphold = {
    land: string;
    varighet: Varighet;
};

export type Varighet = {
    tom: string;
    fom: string;
};

type InformasjonOmUtenlandsopphold = {
    jobbetINorgeSiste12Mnd?: boolean;
    fødselINorge?: boolean;
    iNorgeSiste12Mnd?: boolean;
    iNorgeNeste12Mnd?: boolean;
    tidligerePerioder: Utenlandsopphold[];
    senerePerioder: Utenlandsopphold[];
};

export default InformasjonOmUtenlandsopphold;
