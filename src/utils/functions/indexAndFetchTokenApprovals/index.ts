import { networks } from "@/utils/constants/networks";
import { createPublicClient, formatUnits, http, parseAbiItem } from "viem";

export const indexAndFetchTokenApprovals = async (
  network: (typeof networks)[
    | "avalanchec"
    | "ethereum"
    | "polygonzk"
    | "smartchain"],
  connectedAddress: `0x${string}`, // address of user
  tokenAddress: `0x${string}`, // address of erc20 token
  tokenDecimals: number
) => {
  // Create connection with public client (RPC Node)
  const client = createPublicClient({
    chain: network,
    transport: http(),
  }); // Create client specifying Chain and RPC URL

  const latestBlock = await client.getBlockNumber(); // Get latest block validated on the blockchain for indexing purposes
  const approveLogs = await client.getLogs({
    address: tokenAddress, // On this token...
    event: parseAbiItem(
      // Look for this type of event...
      "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
    ),
    args: {
      //  that was created by our user...
      _owner: connectedAddress,
    },
    fromBlock: latestBlock - 700n, // From latest 700 blocks...
    toBlock: latestBlock,
  }); // Get approve logs from latest 700 blocks

  // For simulation purposes only, please ignore
  approveLogs.push({
    args: { _spender: "0x9532223eAa6Eb6939A00C0A39A054d93b5cCf4Af" },
    // eslint-disable-next-line
  } as any);

  // Go over each approval and see who are the unauthorized spenders
  const allowances = approveLogs.map(async (log) => {
    const spender = log.args._spender;

    const spenderQuantity = await client.readContract({
      address: tokenAddress, // On this token...
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
            {
              name: "_spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "allowance", // Look for how much...
      args: [connectedAddress!, spender!], // The spender is able to spend under our user's signature
    });

    return {
      spender,
      allowance: formatUnits(spenderQuantity, tokenDecimals),
    };
  });

  const results = await Promise.all(allowances);

  return results;
};
