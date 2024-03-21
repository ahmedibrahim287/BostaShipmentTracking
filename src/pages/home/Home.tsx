import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p>{t("navbar.navTabs.home")}</p>
    </div>
  );
};

export default Home;
