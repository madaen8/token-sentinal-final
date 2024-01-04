import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export function LanguageToggle() {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  console.log(t);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={currentLanguage === "en"}
          onClick={() => changeLanguage("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={currentLanguage === "rum"}
          onClick={() => changeLanguage("rum")}
        >
          Romanian
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
