import { useTranslation } from "react-i18next";

const CallSales = () => {
  const { t } = useTranslation();

  return <div>{t("navbar.navTabs.call")}</div>;
};

export default CallSales;
