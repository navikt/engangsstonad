export type Periode = {
    fom: string;
    tom: string;
    land: string;
};

type Utenlandsopphold = {
    jobbetINorgeSiste12Mnd?: boolean;
    fødselINorge?: boolean;
    iNorgeSiste12Mnd?: boolean;
    iNorgeNeste12Mnd?: boolean;
    perioder: Periode[];
};

export default Utenlandsopphold;
