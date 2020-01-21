import { Questions as Steg1Questions } from "./steg-1/questions";
import { Attachment } from "common/storage/attachment/types/Attachment";
import { Questions as Steg2Questions } from "./steg-2/questions";


export interface FormProps {
    [Steg1Questions.erFødt]: boolean;
    [Steg1Questions.antallBarn]: number;
    [Steg1Questions.fødselsdato]: string[];
    [Steg1Questions.termindato]: string;
    [Steg1Questions.terminberkreftelse]: Attachment[];
    [Steg1Questions.termindato]: string;

    [Steg2Questions.navn]: string;
    [Steg2Questions.kanIkkeOppgis]: boolean;
    [Steg2Questions.fodselsnummer]: string;
    [Steg2Questions.utenlandskFodselsnummer]: boolean;
    [Steg2Questions.bostedsland]: string;    
}