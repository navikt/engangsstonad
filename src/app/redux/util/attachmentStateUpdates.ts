import { Attachment, AttachmentType } from 'common/storage/attachment/types/Attachment';
import { Operation } from '../types/Operation';
import EngangsstonadSoknad from '../../types/domain/EngangsstonadSoknad';

export const editAttachmentInState = (
    attachment: Attachment,
    state: EngangsstonadSoknad
): EngangsstonadSoknad => {
    return updateAttachmentState(attachment, state, Operation.EDIT);
};

export const removeAttachmentFromState = (
    attachment: Attachment,
    state: EngangsstonadSoknad
) => {
    return updateAttachmentState(attachment, state, Operation.DELETE);
};

export const addAttachmentToState = (
    attachment: Attachment,
    state: EngangsstonadSoknad
) => {
    return updateAttachmentState(attachment, state, Operation.ADD);
};

const updateAttachmentList = (
    attachments: Attachment[],
    attachment: Attachment,
    operation: Operation
): Attachment[] => {
    if (operation === Operation.ADD) {
        attachments.push(attachment);
    } else if (operation === Operation.EDIT) {
        attachments[attachments.indexOf(attachment)] = attachment;
    } else if (operation === Operation.DELETE) {
        attachments.splice(attachments.indexOf(attachment), 1);
    }
    return attachments;
};

const stateWithUpdatedBarnAttachments = (
    attachment: Attachment,
    state: EngangsstonadSoknad,
    operation: Operation
): EngangsstonadSoknad => {
    const attachments = state.barn[attachment.type] || [];
    const updatedAttachments = updateAttachmentList(
        attachments,
        attachment,
        operation
    );
    return {
        ...state,
        barn: { ...state.barn, [attachment.type]: updatedAttachments }
    };
};

const updateAttachmentState = (
    attachment: Attachment,
    state: EngangsstonadSoknad,
    operation: Operation
): EngangsstonadSoknad => {
    const { type } = attachment;
    const isAttachmentForBarn =
        type === AttachmentType.TERMINBEKREFTELSE;

    if (isAttachmentForBarn) {
        return stateWithUpdatedBarnAttachments(attachment, state, operation);
    }
    return state;
};
