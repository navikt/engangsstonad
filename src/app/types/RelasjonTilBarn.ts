abstract class RelasjonTilBarn {
    antallBarn: number;
}

export interface RelasjonTilFodtBarn {
    fodselsdato: string;
}

export interface RelasjonTilUfodtBarn {
    terminDato: string;
    utstedtDato: string;
}

export default RelasjonTilBarn;
