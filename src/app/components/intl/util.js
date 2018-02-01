import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const getMessage = (intl, id) => intl.formatMessage({ id });
getMessage.propTypes = {
	intl: intlShape.isRequired,
	id: PropTypes.string.isRequired
};
export default getMessage;
