// import { indexAndFetchTokenApprovals } from "./your-file"; // replace with your actual file
// import { createPublicClient } from "viem";
// import { jest } from "@jest/globals";

// jest.unstable_mockModule("viem", () => ({
//   createPublicClient: jest.fn().mockReturnValue({
//     getBlockNumber: jest.fn().mockResolvedValue(2000),
//     getLogs: jest.fn().mockResolvedValue([
//       {
//         args: {
//           _spender: "spender1",
//         },
//       },
//       {
//         args: {
//           _spender: "spender2",
//         },
//       },
//     ]),
//     readContract: jest.fn().mockResolvedValue("1000"),
//   }),
//   formatUnits: jest.fn(
//     (amount, decimals) => `${amount}.${"0".repeat(decimals)}`
//   ),
//   http: jest.fn(),
//   parseAbiItem: jest.fn().mockReturnValue("parsedAbi"),
// }));

// describe("indexAndFetchTokenApprovals", () => {
//   it("fetches token approvals correctly", async () => {
//     const network = "ethereum";
//     const connectedAddress = "0x123456789";
//     const tokenAddress = "0x987654321";
//     const tokenDecimals = 18;

//     const result = await indexAndFetchTokenApprovals(
//       network,
//       connectedAddress,
//       tokenAddress,
//       tokenDecimals
//     );

//     expect(createPublicClient).toHaveBeenCalledWith({
//       chain: network,
//       transport: expect.any(Function),
//     });
//     const client = createPublicClient();
//     expect(client.getBlockNumber).toHaveBeenCalled();
//     expect(client.getLogs).toHaveBeenCalledWith({
//       address: tokenAddress,
//       event: "parsedAbi",
//       args: {
//         _owner: connectedAddress,
//       },
//       fromBlock: expect.any(Number),
//       toBlock: 2000,
//     });
//     result.forEach((approval) => {
//       expect(client.readContract).toHaveBeenCalledWith({
//         address: tokenAddress,
//         abi: expect.any(Array),
//         functionName: "allowance",
//         args: [connectedAddress, approval.spender],
//       });
//     });
//     result.forEach((approval) => {
//       expect(approval.allowance).toBe("1000.000000000000000000");
//     });
//   });
// });
