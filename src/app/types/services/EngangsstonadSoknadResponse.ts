import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from '../domain/RelasjonTilBarn';
import Medlemsskap from '../domain/Medlemsskap';

export type EngangsstonadSoknadResponse = {
    medlemsskap: Medlemsskap;
    relasjonTilBarn: RelasjonTilFodtBarn | RelasjonTilUfodtBarn;
    id: string;
    opprettet: string;
};
