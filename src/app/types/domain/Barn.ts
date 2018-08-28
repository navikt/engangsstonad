import { Attachment } from 'common/storage/attachment/types/Attachment';

abstract class Barn {
    antallBarn?: number | undefined;
    erBarnetFødt?: boolean;
}

export class FodtBarn extends Barn {
    fødselsdatoer: string[];
}

export class UfodtBarn extends Barn {
    termindato?: string | undefined;
    terminbekreftelse: Attachment[]
    terminbekreftelseDato?: string | undefined;
}

export default Barn;
