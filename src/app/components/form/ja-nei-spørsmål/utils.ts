import { JaNeiSpørsmål } from "./JaNeiSpørsmål";

export const isNumber = (string: string) => {
    return /^\d+$/.test(string);
}

export const isJaNeiSpørsmål = (value: string) => {
    return value === JaNeiSpørsmål.JA || value === JaNeiSpørsmål.NEI ? true : false;
} 