import { RadioValues } from "../RadioPanelGruppeResponsive";
import { JaNeiSpørsmål } from "./JaNeiSpørsmål";

export const isNumber = (string: string) => {
    return /^\d+$/.test(string);
}

export const isJaNeiSpørsmål = (value: string) => {
    return value === JaNeiSpørsmål.JA || value === JaNeiSpørsmål.NEI ? true : false;
} 

export const parseNavFrontend = (value: any): string | number | boolean => {
    if (typeof value === 'string' && isNumber(value)) {
        return Number(value);
    }
    if (isJaNeiSpørsmål(value)) {
        return value === JaNeiSpørsmål.JA ? true : false;
    }
    return value;
};

export const getCheckedRadioValue = (value: RadioValues): undefined | string => {
    if (value === undefined) {
        return undefined;
    }
    
    if(typeof value === 'boolean') {
        return parseJaNeiSpørsmål(value);
    } 
    
    return value.toString();
};

const parseJaNeiSpørsmål = (value: boolean): string => {
    return (value ? JaNeiSpørsmål.JA : JaNeiSpørsmål.NEI).toString();
};
