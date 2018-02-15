abstract class RelasjonTilBarn {
    antallBarn: number | undefined;
}

export class RelasjonTilFodtBarn extends RelasjonTilBarn {
    fodselsdato: string | undefined;
}

export class RelasjonTilUfodtBarn extends RelasjonTilBarn {
    terminDato: string | undefined;
    utstedtDato: string | undefined;
}

export default RelasjonTilBarn;
