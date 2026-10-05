module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^element-plus$': '<rootDir>/tests/unit/elementPlusMock.js',
    '^element-plus/(.*)$': '<rootDir>/tests/unit/elementPlusMock.js',
    '^@element-plus/icons-vue$': '<rootDir>/tests/unit/elementPlusIconsMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/unit/styleMock.js',
  },
  testMatch: [
    '**/tests/unit/**/*.spec.[jt]s?(x)',
  ],
};
