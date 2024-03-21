import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import i18n from "../../translation/i18n";
import useIsRTL from "../../app/CustomHooks/useIsRTL";
import styles from "./LanguageSwitchButtons.module.css";

const GlobalStyle = createGlobalStyle`
  body {
    direction: ${({ theme }) => (theme.isRTL ? "rtl" : "ltr")};
  }
`;

const LanguageSwitcher = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = isRTL ? "en" : "ar";
    setIsRefreshing(true); // Start loading
    setTimeout(() => {
      i18n.changeLanguage(newLanguage);
      localStorage.setItem("language", newLanguage); // Store selected language in local storage
      setIsRefreshing(false); // Stop loading
    }, 1000); // Set a timeout to simulate loading time
  };

  const theme = {
    isRTL: isRTL,
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <button
          onClick={toggleLanguage}
          className={`${styles.btnLang} btn btn-outline-danger border-0`}
        >
          {t("navbar.lang")}
        </button>
        {isRefreshing && (
          <div className={styles["tracking-results"]}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default LanguageSwitcher;
