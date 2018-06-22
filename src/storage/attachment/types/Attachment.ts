export interface AttachmentMetadata {
    id: string;
    filename: string;
    filesize: number;
    url?: string;
    pending: boolean;
    uploaded: boolean;
    group?: string;
}

export interface Attachment extends AttachmentMetadata {
    file: File;
}
