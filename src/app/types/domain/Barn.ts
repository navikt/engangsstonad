abstract class Barn {
    antallBarn?: number | undefined;
    erBarnetFodt?: boolean;
}

export class FodtBarn extends Barn {
    fodselsdatoer: string[];
}

export class UfodtBarn extends Barn {
    termindato?: string | undefined;
    terminbekreftelseDato?: string | undefined;
}

export default Barn;
