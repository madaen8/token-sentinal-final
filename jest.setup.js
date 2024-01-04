import { jest } from "@jest/globals";

jest.unstable_mockModule("viem", () => ({
  createPublicClient: () => ({
    readContract: jest.fn(() => Promise.resolve(1000)),
  }),
}));
