import Medlemsskap from './Medlemsskap';
import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from './RelasjonTilBarn';

type EngangsstonadSoknad = {
    medlemsskap: Medlemsskap;
    relasjonTilBarn: RelasjonTilFodtBarn | RelasjonTilUfodtBarn;
}

export type EngangsstonadSoknadResponseType = {
    medlemsskap: Medlemsskap;
    relasjonTilBarn: RelasjonTilFodtBarn | RelasjonTilUfodtBarn;
    id: string;
    opprettet: string;
}

export default EngangsstonadSoknad;
