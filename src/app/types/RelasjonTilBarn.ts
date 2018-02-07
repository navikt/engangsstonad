abstract class RelasjonTilBarn {
    antallBarn: number;
}

export interface RelasjonTilFodtBarn extends RelasjonTilBarn {
    fodselsdato: string;
}

export interface RelasjonTilUfodtBarn extends RelasjonTilBarn {
    terminDato: string;
    utstedtDato: string;
}

export default RelasjonTilBarn;
