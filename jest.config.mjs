import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.(ts|tsx)"],
};

export default createJestConfig(config);
