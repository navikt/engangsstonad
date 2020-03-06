export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    error?: any;
}

export enum AttachmentType {
    TERMINBEKREFTELSE = 'terminbekreftelse'
}

export enum Skjemanummer {
    TERMINBEKREFTELSE = 'I000062'
}
