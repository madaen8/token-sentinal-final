import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { MailWarningIcon } from "lucide-react";
import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useTranslation } from "react-i18next";
import { Card } from "../ui/card";

export const ModalDonation = () => {
  const { t } = useTranslation();

  const [ethAmount, setEthAmount] = useState("0.01");

  const { sendTransaction } = useSendTransaction({
    to: "moxey.eth",
    value: parseEther(ethAmount),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t("support-us")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("donation.title")}</DialogTitle>
          <DialogDescription>{t("donation.paragraph-1")}</DialogDescription>
          <DialogDescription>{t("donation.paragraph-2")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" items-center gap-4 w-full">
            <Card className="flex items-center justify-end w-full p-4 gap-5">
              <Label htmlFor="ethAmount" className="text-right">
                {t("donation.eth-amount")}
              </Label>
              <Input
                id="ethAmount"
                type="number"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.currentTarget.value)}
                className="w-3/5"
              />
            </Card>
          </div>
        </div>
        <Alert>
          <MailWarningIcon className="h-4 w-4" />
          <AlertTitle>{t("donation.heads-up.title")}</AlertTitle>
          <AlertDescription>
            {t("donation.heads-up.description")}
          </AlertDescription>
        </Alert>
        <DialogFooter onClick={() => sendTransaction()}>
          <Button type="submit"> {t("donation.donate-us")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
