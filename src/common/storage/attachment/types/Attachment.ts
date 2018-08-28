export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
}

export enum AttachmentType {
    TERMINBEKREFTELSE = 'terminbekreftelse'
}

export enum Skjemanummer {
    TERMINBEKREFTELSE = 'I000062'
}
