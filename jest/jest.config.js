module.exports = {
	roots: ['../src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass|less|svg)$': '<rootDir>/../node_modules/jest-css-modules',
		'\\-style$': '<rootDir>/../node_modules/jest-css-modules',
		'^components/(.*)': '<rootDir>/../src/app/components/$1',
		'^common/(.*)': '<rootDir>/../src/common/$1',
	},
	setupFiles: ['<rootDir>/test-setup.js']
};
