import { all, call, put, takeEvery } from 'redux-saga/effects';
import AttachmentApi from '../../../common/storage/api/attachmentApi';

import soknadActionCreators from 'actions/soknad/soknadActionCreators';
import { SoknadActionKeys, UploadAttachment } from 'actions/soknad/soknadActionDefinitions';
import apiActionCreators from 'actions/api/apiActionCreators';

function* uploadAttachment(action: UploadAttachment) {
    const attachment = action.payload;
    try {
        const response = yield call(AttachmentApi.saveAttachment, attachment);
        const uri: string = response.headers.location || 'mockurl';
        const uuid: string = response.data;
        yield put(soknadActionCreators.uploadAttachmentSuccess(attachment, uri, uuid));
    } catch (error) {
        (error.response.status === 401 || error.response.status === 403) ? yield put(apiActionCreators.sessionExpired())
            :
        yield put(soknadActionCreators.uploadAttachmentFailed(error, attachment));
    }
}

export default function* attachmentSaga() {
    yield all([
        takeEvery(SoknadActionKeys.UPLOAD_ATTACHMENT, uploadAttachment)
    ]);
}
