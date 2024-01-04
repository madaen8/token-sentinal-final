import { tokens } from "@/utils/constants/tokens";
import { formatUnits } from "viem";
import { indexAndFetchTokenApprovals } from "../indexAndFetchTokenApprovals";
import { fetchTokenBalance } from "../fetchTokenBalance";

export const fetchTokens = async (connectedAddress: `0x${string}`) => {
  const allData = [];

  for (
    let tokenIndex = 0;
    tokenIndex < Object.keys(tokens).length;
    tokenIndex++
  ) {
    const tokenObjKey = Object.keys(tokens)[tokenIndex] as keyof typeof tokens;
    const token = tokens[tokenObjKey];

    const data = await Promise.all(
      token.addresses.map(async ({ network, address }) => {
        if (network.id === 1) return;

        // Fetch user's balance of the token
        const balance = await fetchTokenBalance(
          network,
          connectedAddress,
          address
        );

        // Fetch user's unauthorized spenders
        const approvals = await indexAndFetchTokenApprovals(
          network,
          connectedAddress,
          address,
          token.decimals
        );
        const approval = approvals.find((app) => Number(app.allowance) > 0);

        return {
          asset: token.name,
          network: network.name,
          type: "token",
          totalAmount: formatUnits(balance, token.decimals),
          approvedAmount: approval ? approval.allowance : 0,
          tokenAddress: token.addresses.find(
            (chain) => chain.network.id === network.id
          )?.address,
          authorizedSpenders:
            Number(approval?.allowance) > 0 ? [approval?.spender] : [],
          blockExplorer: network.blockExplorers.default.url,
        };
      })
    );

    // Remove undefined values
    const safeData = data.filter((item) => item);

    allData.push(...safeData);
  }

  return allData;
};
