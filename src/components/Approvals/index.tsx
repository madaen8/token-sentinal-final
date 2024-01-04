import { useAccount, useSwitchNetwork } from "wagmi";
import { Card, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { TypographyH2 } from "../ui/typography";
import { ApprovalsTable } from "../ApprovalsTable";
import { useEffect } from "react";

export const Approvals = () => {
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    try {
      switchNetwork!(43114);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Card className="max-w-[1300px] w-full m-auto mt-10">
      <CardHeader className="p-6">
        <TypographyH2>{address}</TypographyH2>
      </CardHeader>
      <Separator />
      <ApprovalsTable />
    </Card>
  );
};
