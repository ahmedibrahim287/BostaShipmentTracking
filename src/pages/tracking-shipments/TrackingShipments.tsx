// TrackingShipments.tsx

import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Stepper from "../../components/stepper/stepper";
import OrderDetails from "../../components/orderDetails/OrderDetails";
import styles from "./tracking-shipment.module.css";
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
      <div className={styles["tracking-results"]}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
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
      <section className="container margin-top-6">
        <div className="container-fluid">
          <div className="row " style={{ gap: "6rem" }}>
            <Stepper status={data.CurrentStatus.state} data={data} />

            <div className="col-12 p-0">
              <OrderDetails data={data} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackingShipments;
