import { networks } from "../networks";

type IToken = {
  name: string;
  decimals: number;
  addresses: Array<{
    network: (typeof networks)[
      | "ethereum"
      | "avalanchec"
      | "polygonzk"
      | "smartchain"];
    address: `0x${string}`;
  }>;
};

export const tokens: Record<string, IToken> = {
  usdc: {
    name: "USDC",
    decimals: 6,
    addresses: [
      {
        network: networks.ethereum,
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      {
        network: networks.avalanchec,
        address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      },
      {
        network: networks.smartchain,
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      },
      {
        network: networks.polygonzk,
        address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
      },
    ],
  },
  usdt: {
    name: "USDT",
    decimals: 6,
    addresses: [
      {
        network: networks.ethereum,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      {
        network: networks.avalanchec,
        address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      },
      {
        network: networks.polygonzk,
        address: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
      },
    ],
  },
  dai: {
    name: "DAI",
    decimals: 18,
    addresses: [
      {
        network: networks.ethereum,
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      },
      {
        network: networks.smartchain,
        address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
      },
      {
        network: networks.avalanchec,
        address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
      },
    ],
  },
};
