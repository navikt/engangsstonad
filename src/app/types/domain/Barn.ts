abstract class Barn {
    antallBarn?: number | undefined;
    erBarnetFødt?: boolean;
    fødselsdatoer: string[];
}

export class FodtBarn extends Barn {
    fødselsdatoer: string[];
}

export class UfodtBarn extends Barn {
    termindato?: string | undefined;
    terminbekreftelseDato?: string | undefined;
}

export default Barn;
