import { useState, useEffect } from "react";
import i18n from "../../translation/i18n";

const useIsRTL = () => {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const updateDirection = () => {
      const lang = i18n.language;
      setIsRTL(lang === "ar");
    };

    // Update direction when language changes
    i18n.on("languageChanged", updateDirection);

    // Initial direction update
    updateDirection();

    // Cleanup
    return () => {
      i18n.off("languageChanged", updateDirection);
    };
  }, []);

  return isRTL;
};

export default useIsRTL;
