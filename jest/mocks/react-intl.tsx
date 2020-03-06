let getMessage = jest.genMockFromModule('common/util/i18nUtils');


getMessage = ({defaultMessage}: any) => defaultMessage;

module.exports = getMessage;