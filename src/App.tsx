import { useAccount } from "wagmi";
import { Navbar } from "./components/Navbar";
import { Approvals } from "./components/Approvals";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { Card, CardDescription } from "./components/ui/card";
import BigWhite from "/big-logo-white.png";
import BigDark from "/big-logo-dark.png";
import { TypographyH1 } from "./components/ui/typography";
import { useTranslation } from "react-i18next";

function App() {
  const { isConnected } = useAccount();
  const { t } = useTranslation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Card className="min-h-screen rounded-none">
        <Navbar />
        {isConnected ? (
          <Approvals />
        ) : (
          <Card className="m-auto w-[700px] mt-56 text-center p-20">
            <TypographyH1> {t("title")}</TypographyH1>
            <img src={BigDark} className="m-auto mt-12 hidden dark:block" />
            <img src={BigWhite} className="m-auto mt-12 block dark:hidden" />
            <CardDescription className="mt-12">
              {t("description")}{" "}
            </CardDescription>
          </Card>
        )}
      </Card>
    </ThemeProvider>
  );
}

export default App;
