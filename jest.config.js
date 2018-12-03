'use strict';

module.exports = {
  preset: 'ts-jest',
  verbose: true,

  // Setup Enzyme
  testPathIgnorePatterns: ['/node_modules/', '__tests__/setupEnzyme.ts'],
  setupTestFrameworkScriptFile: '<rootDir>/__tests__/setupEnzyme.ts',
  snapshotSerializers: ['enzyme-to-json/serializer']
};
