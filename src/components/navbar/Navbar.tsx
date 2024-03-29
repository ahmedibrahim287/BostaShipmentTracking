import TrackingResults from "../trackingResults/TrackingResults";
import arBrandLogo from "../../assets/svg/arBostaLogo.svg";
import enBrandLogo from "../../assets/svg/enBostaLogo.svg";
import LanguageSwitcher from "../languageSwitchButtons/LanguageSwitchButtons";
import useIsRTL from "../../app/CustomHooks/useIsRTL";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";
import { useEffect, useRef, useState } from "react";

const navbar = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLLIElement>(null); // Change type to HTMLLIElement
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setClicked(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <nav className="navbar navbar-expand-lg padding-top-1 pb-0 ">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="w-75" src={isRTL ? arBrandLogo : enBrandLogo} />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className={`${styles.tabs}  ${
                isRTL ? "ms-auto" : "ms-0"
              }  navbar-nav justify-content-between w-85`}
            >
              <li className="nav-item">
                <Link
                  className={`${styles["nav-link-overWrite"]} nav-link`}
                  aria-current="page"
                  to="/"
                >
                  {t("navbar.navTabs.home")}
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link
                  className={`${styles["nav-link-overWrite"]} nav-link`}
                  to="/prices"
                >
                  {t("navbar.navTabs.prices")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles["nav-link-overWrite"]} nav-link`}
                  aria-current="page"
                  to="/call-sales"
                >
                  {t("navbar.navTabs.call")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className={`${styles.subTabs} navbar-nav  ${
                isRTL ? "me-auto" : "ms-auto"
              }  mb-2 mb-lg-0 justify-content-center align-items-lg-center `}
            >
              <li
                ref={dropdownRef}
                className={`${
                  clicked ? styles["nav-item-overwrite"] : "nav-item "
                }  dropdown`}
              >
                <button
                  className={` ${
                    clicked
                      ? isRTL
                        ? styles["nav-link-dropdown"]
                        : styles["nav-link-dropdown-rtl"]
                      : styles["nav-link-overWrite"]
                  }    nav-link 
                 
                  `}
                  role="button"
                  onClick={handleClick}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("navbar.navTabs.track")}
                </button>
                {isOpen && (
                  <ul
                    className={`dropdown-menu ${styles.dropdownOverwrite} ${
                      clicked ? "show" : styles["unShow"]
                    } `}
                  >
                    <li className="h-100">
                      <TrackingResults />
                    </li>
                  </ul>
                )}
              </li>

              <div
                className={`${clicked ? "d-none" : "d-none  d-lg-block  "} ${
                  styles["border-break"]
                }  `}
              ></div>
              <li className="nav-item">
                <a
                  className={`${styles["nav-link-overWrite"]} nav-link`}
                  aria-disabled="true"
                >
                  {t("navbar.navTabs.login")}
                </a>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
      <hr className="m-0 mt-1 d-none  d-lg-block " />
    </>
  );
};

export default navbar;
