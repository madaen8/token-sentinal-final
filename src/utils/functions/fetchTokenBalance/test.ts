import { createPublicClient } from "viem";
import { fetchTokenBalance } from ".";
import { avalanche } from "viem/chains";
import { jest } from "@jest/globals";

jest.unstable_mockModule("viem", () => ({
  createPublicClient: () => ({
    readContract: jest.fn(() => Promise.resolve(500n)),
  }),
}));

describe("fetchTokenBalance", () => {
  it("fetches token balance correctly", async () => {
    const network = avalanche;
    const connectedAddress = "0x9532223eAa6Eb6939A00C0A39A054d93b5cCf4Af";
    const tokenAddress = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";

    const result = await fetchTokenBalance(
      network,
      connectedAddress,
      tokenAddress
    );

    expect(createPublicClient).toHaveBeenCalledWith({
      chain: network,
      transport: expect.any(Function),
    });

    expect(result).toBe(500n);
  });
});
