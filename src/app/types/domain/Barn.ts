abstract class Barn {
    antallBarn?: number | undefined;
    erBarnetFødt?: boolean;
}

export class FodtBarn extends Barn {
    fødselsdato: string;
}

export class UfodtBarn extends Barn {
    termindato?: string | undefined;
    terminbekreftelseDato?: string | undefined;
}

export default Barn;
