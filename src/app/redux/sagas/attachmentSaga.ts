import { all, call, put, takeEvery } from 'redux-saga/effects';
import AttachmentApi from '../../../common/storage/api/attachmentApi';

import soknadActionCreators from 'actions/soknad/soknadActionCreators';
import { DeleteAttachment, SoknadActionKeys, UploadAttachment } from 'actions/soknad/soknadActionDefinitions';

function* uploadAttachment(action: UploadAttachment) {
    const attachment = action.payload;
    try {
        const response = yield call(AttachmentApi.saveAttachment, attachment);
        const uri: string = response.headers.location || 'mockurl';
        const uuid: string = response.data;
        yield put(soknadActionCreators.uploadAttachmentSuccess(attachment, uri, uuid));
    } catch (error) {
        yield put(soknadActionCreators.uploadAttachmentFailed(error, attachment));
    }
}

function* deleteAttachment(action: DeleteAttachment) {
    const attachment = action.attachment;
    try {
        yield call(AttachmentApi.deleteAttachment, attachment);
        yield put(soknadActionCreators.deleteAttachmentSuccess(attachment));
        // yield put(apiActions.storeAppState());
    } catch (error) {
        yield put(soknadActionCreators.deleteAttachmentFailed(error, attachment));
    }
}

export default function* attachmentSaga() {
    yield all([
        takeEvery(SoknadActionKeys.UPLOAD_ATTACHMENT, uploadAttachment),
        takeEvery(SoknadActionKeys.DELETE_ATTACHMENT, deleteAttachment)
    ]);
}
