import { Question } from "./steg-1/questions";
import { Attachment } from "common/storage/attachment/types/Attachment";


export interface FormProps {
    [Question.erFødt]: boolean;
    [Question.antallBarn]: number;
    [Question.fødselsdato]: string[];
    [Question.termindato]: string;
    [Question.terminberkreftelse]: Attachment[];
    [Question.termindato]: string;
}