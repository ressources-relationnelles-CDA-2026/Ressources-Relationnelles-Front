
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});


const config = {
 
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  coverageDirectory: "coverage",

  testMatch: [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
  ],

  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/tests/e2e/",
  ],


  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "services/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
};


export default createJestConfig(config);