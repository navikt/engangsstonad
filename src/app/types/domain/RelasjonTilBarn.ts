abstract class RelasjonTilBarn {
    antallBarn: number | undefined;
}

export interface RelasjonTilFodtBarn extends RelasjonTilBarn {
    fodselsdato: string | undefined;
}

export interface RelasjonTilUfodtBarn extends RelasjonTilBarn {
    terminDato: string | undefined;
    utstedtDato: string | undefined;
}

export default RelasjonTilBarn;
