import Person from "./Person";
import Arbeidsforhold from "./Arbeidsforhold";

export interface Søkerinfo extends Person {
    arbeidsforhold: Arbeidsforhold[];
    barn: RegistrertBarn[];
}

export interface RegistrertBarn extends Person {
    annenForelder?: RegistrertAnnenForelder;
}

export interface RegistrertAnnenForelder extends Omit<Person, 'kjønn'> {
    harOpplystOmSinPågåendeSak?: boolean;
}

