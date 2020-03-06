const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('./mocks/react-intl');

enzyme.configure({ adapter: new Adapter() });
