export type Utenlandsopphold = {
    land: string;
    tidsperiode: Tidsperiode;
};

export type Tidsperiode = {
    tom: string;
    fom: string;
};

type InformasjonOmUtenlandsopphold = {
    jobbetINorgeSiste12Mnd?: boolean;
    iNorgeSiste12Mnd?: boolean;
    iNorgeNeste12Mnd?: boolean;
    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
};

export default InformasjonOmUtenlandsopphold;
