import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchTrackingData } from "./trackingSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./tracking-result.module.css";
import useIsRTL from "../../app/CustomHooks/useIsRTL";
import searchIcon from "../../assets/svg/search.svg";

const TrackingResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrackingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trackingNumber.trim() !== "") {
      dispatch(fetchTrackingData(trackingNumber));
      // Redirect to tracking details page
      navigate(`/tracking-shipment/${trackingNumber}`);
    }
  };

  // Function to handle input change and allow numbers only
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Only set the tracking number if it contains numbers only
    if (/^\d*$/.test(value)) {
      setTrackingNumber(value);
    }
  };

  const isRTL = useIsRTL();

  return (
    <>
      <div
        className={`w-100 h-100 d-flex flex-column justify-content-center align-items-start  px-1 py-2 ${
          isRTL ? "margin-right-10" : "margin-left-10"
        }  ${styles.fontForm}`}
      >
        <p className="m-0 mb-2"> {t("navbar.navTabs.track")}</p>
        <div className="input-group input-group-default">
          <form className={`w-75`} onSubmit={handleTrackingSubmit}>
            <input
              placeholder={t("navbar.navTabs.trackNumber")}
              type="text"
              pattern="\d*"
              className={`${styles.inputSearch} form-control`}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={trackingNumber}
              onChange={handleInputChange}
            />
            <img
              className={`${
                isRTL ? styles.svg : styles.svgEn
              } position-absolute`}
              style={{ color: "white" }}
              src={searchIcon}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default TrackingResults;
