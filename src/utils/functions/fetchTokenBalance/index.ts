import { networks } from "@/utils/constants/networks";
import { createPublicClient, http } from "viem";

export const fetchTokenBalance = async (
  network: (typeof networks)[
    | "avalanchec"
    | "ethereum"
    | "polygonzk"
    | "smartchain"],
  connectedAddress: `0x${string}`, // Address of the user connected
  tokenAddress: `0x${string}` // Address of the ERC20 token
) => {
  // Create connection with public client (RPC Node)
  const client = createPublicClient({
    chain: network,
    transport: http(),
  }); // Create client specifying Chain and RPC URL

  const tokenBalance = await client.readContract({
    address: tokenAddress,
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf", // Get balance of connectedAddress for specific token
    args: [connectedAddress!],
  });

  return tokenBalance;
};
