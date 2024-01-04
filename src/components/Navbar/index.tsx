import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ModalDonation } from "../ModalDonation";
import LightLogo from "/logo-light.jpg";
import DarkLogo from "/logo-dark.jpg";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { useTheme } from "@/contexts/ThemeProvider";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { open } = useWeb3Modal();
  const { isConnected, address, status } = useAccount();
  const isLoading = status === "reconnecting" || status === "connecting";
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between max-w-[1300px] m-auto mt-8 relative">
      <div className="flex items-center gap-5">
        <ModalDonation />
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <img
        src={theme === "light" ? LightLogo : DarkLogo}
        alt="logo"
        className="w-14 absolute left-2/4 [transform:translateX(-50%)]"
      />
      <div>
        <Button
          variant={isConnected ? "outline" : "secondary"}
          onClick={() => open()}
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isConnected && (
            <Avatar className="w-auto h-6 mr-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          {(isConnected && `${address?.substring(0, 10)}...`) ||
            (isLoading && "Connecting...") ||
            t("connect")}
        </Button>
      </div>
    </header>
  );
};
