import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
// import { mainnet, WagmiConfig } from "wagmi";
// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
// import { arbitrum } from "viem/chains";

// 1. Get projectId
// const projectId = "089c4f2d43523f907ed071e1d062d63c";

// // 2. Create wagmiConfig
// const metadata = {
//   name: "Web3Modal",
//   description: "Web3Modal Example",
//   url: "https://web3modal.com",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// const chains = [mainnet, arbitrum];
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains });

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
