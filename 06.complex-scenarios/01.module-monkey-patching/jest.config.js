/**
 * For a detailed explanation regarding each configuration property, visit: */

/** @type {import('jest').Config} */
const config = {  
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  testRunner: "jest-circus/runner",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};

module.exports = config;
