import EngangsstonadSoknad from '../domain/EngangsstonadSoknad';

export interface EngangsstonadSoknadResponse extends EngangsstonadSoknad {
    referanseId: string;
    mottattDato: string;
    sistEndret: string;
}
