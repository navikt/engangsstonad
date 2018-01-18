export const fullNameFormat = (fornavn, mellomnavn, etternavn) => {
	if (mellomnavn) {
		return `${fornavn} ${mellomnavn} ${etternavn}`;
	}
	return `${fornavn} ${etternavn}`;
};

export default {
	fullNameFormat
};
