import { Attachment } from 'common/storage/attachment/types/Attachment';

interface Barn {
    antallBarn?: number | undefined;
    erBarnetFødt?: boolean;
}

export interface FodtBarn extends Barn {
    fødselsdatoer: string[];
}

export interface UfodtBarn extends Barn {
    termindato?: string | undefined;
    terminbekreftelse: Attachment[]
    terminbekreftelseDato?: string | undefined;
}

export default Barn;
