import { useTranslation } from "react-i18next";

const Prices = () => {
  const { t } = useTranslation();

  return <div>{t("navbar.navTabs.prices")}</div>;
};

export default Prices;
