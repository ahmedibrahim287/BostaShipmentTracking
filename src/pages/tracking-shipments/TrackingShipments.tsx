// TrackingShipments.tsx

import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Stepper from "../../components/stepper/stepper";

const TrackingShipments = () => {
  const { data, isLoading, error } = useAppSelector(
    (state: RootState) => state.tracking
  );
  const { t } = useTranslation(); // Hook for translation
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(t("error"));
    } else {
      setErrorMessage(null); // Reset error message on successful data fetch
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="tracking-results">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="tracking-results">
        <p>{t("error")}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Stepper status={data.CurrentStatus.state} />

      <div className="tracking-results">
        <div className="tracking-details">
          <h2>{t("Tracking Details")}</h2>
          <p>
            {t("CreateDate")}: {data.CreateDate}
          </p>
          <p>
            {t("CurrentStatus.state")}: {data.CurrentStatus.state}
          </p>
          <p>
            {t("CurrentStatus.timestamp")}: {data.CurrentStatus.timestamp}
          </p>
          <p>
            {t("PromisedDate")}: {data.PromisedDate}
          </p>
          <p>
            {t("SupportPhoneNumbers")}: {data.SupportPhoneNumbers}
          </p>
          <p>
            {t("TrackingNumber")}: {data.TrackingNumber}
          </p>
          <p>
            {t("TrackingURL")}: {data.TrackingURL}
          </p>
          <p>
            {t("isEditableShipment")}: {data.isEditableShipment}
          </p>
        </div>
      </div>
    </>
  );
};

export default TrackingShipments;
