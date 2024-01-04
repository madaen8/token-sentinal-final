import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      title: "Connect your wallet to",
      description: `Use the "Connect Wallet" button to on the topbar to get started!`,
      connect: "Connect Wallet",
      "support-us": "Support Us!",
      "welcome-to-react": "Welcome to React and react-i18next",
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System",
      },
      donation: {
        title: "Support Our DApp With ETH!",
        "paragraph-1":
          "Join us on our journey to revolutionize the blockchain space. Contribute towards the development and maintenance of our decentralized application (DApp) by donating Ethereum (ETH).",
        "paragraph-2":
          "Your donations will accelerate the growth and enhancement of our DApp, enabling us to offer you and the global community a better, faster, and more secure decentralized experience.",
        "eth-amount": "ETH Amount",
        "heads-up": {
          title: "Heads up!",
          description:
            "Please note: Contributions are voluntary and non-refundable. Every ETH counts and is greatly appreciated. Together, let's shape the future of blockchain technology.",
        },
        "donate-us": "Donate Us!",
      },
      table: {
        "input-filter": "Filtrați după numele simbolului...",
        dropdown: {
          columns: "Columns",
          asset: "Asset",
          type: "Type",
          network: "Network",
          totalAmount: "Total Amount",
          approvedAmount: "Approved Amount",
          tokenAddress: "Token Address",
          authorizedSpenders: "Authorized Spenders",
        },
        actions: {
          title: "Actions",
          copy: "Copy token address",
          view: "View token on blockchain",
          revoke: "Revoke approvals",
        },
        previous: "Previous",
        next: "Next",
      },
    },
  },
  rum: {
    translation: {
      title: "Conectează-ți portofelul la",
      description: `Utilizați butonul "Conectează Portofelul" de pe bara de sus pentru a începe!`,
      connect: "Conectează Portofelul",
      "support-us": "Ajuta-ne!",
      "Welcome to React": "Bienvenue à React et react-i18next",
      donation: {
        title: "Sprijiniți DApp-ul nostru cu ETH!",
        "paragraph-1":
          "Alăturați-vă în călătoria noastră de a revoluționa spațiul blockchain. Contribuiți la dezvoltarea și întreținerea aplicației noastre descentralizate (DApp) donând Ethereum (ETH).",
        "paragraph-2":
          "Donațiile dvs. vor accelera creșterea și îmbunătățirea DApp-ului nostru, permițându-ne să vă oferim dumneavoastră și comunității globale o experiență descentralizată mai bună, mai rapidă și mai sigură.",
        "eth-amount": "Suma ETH",
        "heads-up": {
          title: "Atenție!",
          description:
            "Vă rugăm să rețineți: contribuțiile sunt voluntare și nerambursabile. Fiecare ETH contează și este foarte apreciat. Împreună, să modelăm viitorul tehnologiei blockchain.",
        },
        "donate-us": "Donează-ne",
      },
      themes: {
        light: "Lumină",
        dark: "Intunecat",
        system: "Sistem",
      },
      table: {
        "input-filter": "Filtrează după numele simbolului...",
        dropdown: {
          columns: "Coloane",
          type: "Tip",
          asset: "Activ",
          network: "Rețea",
          totalAmount: "Cantitate Totală",
          approvedAmount: "Cantitate Aprobată",
          tokenAddress: "Adresa Token",
          authorizedSpenders: "Cheltuitori Autorizați",
        },
        actions: {
          title: "Acțiuni",
          copy: "Copiați adresa tokenului",
          view: "Vizualizați tokenul pe blockchain",
          revoke: "Revocare aprobări",
        },
        previous: "Anterior",
        next: "Următorul",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
