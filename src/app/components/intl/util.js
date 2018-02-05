import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const getMessage = (intl, id, values) => intl.formatMessage({ id }, values);

getMessage.propTypes = {
	intl: intlShape.isRequired,
	id: PropTypes.string.isRequired
};
export default getMessage;
