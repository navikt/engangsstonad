module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass|less)$': '<rootDir>/node_modules/jest-css-modules',
		'\\-style$': '<rootDir>/node_modules/jest-css-modules'
	},
	setupFiles: ['<rootDir>/src/test/test-setup.js']
};
