import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useContractWrite } from "wagmi";
import { useEffect } from "react";

type Asset = {
  asset: string;
  network: string;
  type: string;
  totalAmount: string;
  approvedAmount: string;
  tokenAddress: `0x${string}`;
  authorizedSpenders: `0x${string}`[];
  blockExplorer?: string;
};

export function Action({
  asset,
  fetchApprovals,
}: {
  asset: Asset;
  fetchApprovals(): void;
}) {
  const { t } = useTranslation();

  const { isLoading, isSuccess, write } = useContractWrite({
    address: asset.tokenAddress,
    abi: [
      {
        constant: false,
        inputs: [
          {
            name: "_spender",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
    functionName: "approve",
    args: [asset.authorizedSpenders[0], 0n],
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        fetchApprovals();
      }, 5000);
    }
  }, [isSuccess, fetchApprovals]);

  const handleWrite = async () => {
    // console.log(networks, asset.network);
    // console.log(networks[asset.network as keyof typeof networks].id);
    try {
      write();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("table.actions.title")}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(asset.tokenAddress)}
        >
          {t("table.actions.copy")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a
            href={`${asset.blockExplorer}/address/${asset.tokenAddress}`}
            target="_blank"
          >
            {t("table.actions.view")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!asset.authorizedSpenders.length}
          onClick={() => handleWrite()}
        >
          {isLoading ? "Loading..." : t("table.actions.revoke")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
