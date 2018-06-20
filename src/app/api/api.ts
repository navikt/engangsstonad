import axios from 'axios';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';
import { Attachment, AttachmentMetadata } from 'storage/attachment/types/Attachment';

function getPerson() {
    const endpoint = (window as any).REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, {withCredentials: true});
}

function sendSoknad(soknad: EngangsstonadSoknad, vedleggListe: Attachment[] = []) {
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'application/json;',
        }

    };

    const vedleggWithoutFiles: AttachmentMetadata[] = vedleggListe.map((vedlegg: Attachment) => {
        delete vedlegg.file;
        return vedlegg;
    });

    const url = `${(window as any).REST_API_URL}/engangsstonad`;
    return axios.post(url, {...soknad, vedlegg: vedleggWithoutFiles}, config);
}

const Api = {getPerson, sendSoknad};

export default Api;
