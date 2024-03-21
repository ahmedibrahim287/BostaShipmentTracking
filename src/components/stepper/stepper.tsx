import React from "react";
import styles from "./stepper.module.css";
import { useTranslation } from "react-i18next";
import { TrackingData } from "../trackingResults/trackingTypes";

interface ProgressBarProps {
  status: string;
  data: TrackingData;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ status, data }) => {
  const { t } = useTranslation();

  let percentage = 0;

  switch (status) {
    case "CREATED":
      percentage = 0;
      break;
    case "DELIVERED_TO_SENDER":
      percentage = 38;
      break;
    case "CANCELLED":
      percentage = 63;
      break;
    case "DELIVERED":
      percentage = 100;
      break;
    default:
      percentage = 0;
  }

  let date = new Date(data.PromisedDate);
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let formattedDate = date.toLocaleDateString("en-US", options);

  let statusClass = ""; // Initialize an empty string for the class name

  // Determine the appropriate class based on the state
  if (data.CurrentStatus.state === "DELIVERED") {
    statusClass = "statusSuccess";
  } else if (data.CurrentStatus.state === "DELIVERED_TO_SENDER") {
    statusClass = "statusWarning";
  } else if (data.CurrentStatus.state === "CANCELLED") {
    statusClass = "statusFail";
  }

  return (
    <div className="col-12 border border-secondary-subtle p-0 padding-top-4 padding-bottom-4 px-0 border-opacity-25 rounded-3">
      <div className="container d-flex flex-column gap-5 ">
        <div className="row">
          <div className="col-12 margin-bottom-4">
            <div className="container">
              <div className={`row ${styles.heading}`}>
                <div className="col-3">
                  <h6 className={styles.headingH}>
                    {t("trackShipment.orderNumber") + " " + data.TrackingNumber}
                  </h6>
                  <h6 className={styles[statusClass]}>
                    {data.CurrentStatus.state === "DELIVERED" &&
                      t("trackShipment.DELIVERED")}
                    {data.CurrentStatus.state === "DELIVERED_TO_SENDER" &&
                      t("trackShipment.DELIVERED_TO_SENDER")}
                    {data.CurrentStatus.state === "CANCELLED" &&
                      t("trackShipment.CANCELLED")}
                  </h6>
                </div>
                <div className="col-3">
                  <h6 className={styles.headingH}>
                    {t("trackShipment.lastUpdate")}
                  </h6>
                  <h6>
                    {new Date(
                      data.CurrentStatus.timestamp
                    ).toLocaleDateString()}
                    <span>
                      {" "}
                      {new Date(data.CurrentStatus.timestamp).toLocaleString(
                        [],
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </h6>
                </div>
                <div className="col-3 text-center">
                  <h6 className={styles.headingH}>
                    {t("trackShipment.merchantName")}
                  </h6>
                  <h6>{data.provider}</h6>
                </div>
                <div className="col-3">
                  <h6 className={styles.headingH}>
                    {t("trackShipment.deliveryTime")}
                  </h6>
                  <h6>{formattedDate}</h6>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="col-12"></div>
          <div className="progress position-relative">
            <div
              className={`progress-bar ${getProgressBarColor(percentage)}`}
              role="progressbar"
              aria-label="Progress"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="col-12">
          <div className="container p-0">
            <div className={`row ${styles.heading}`}>
              <div className="col-3 m-0 p-0 text-center ">
                {t("trackShipment.CREATED")}
              </div>
              <div className="col-3 m-0 p-0 text-center">
                {t("trackShipment.DELIVERED_TO_SENDER")}
              </div>
              <div className="col-3 m-0 p-0 text-center d-flex flex-column justify-content-center align-items-center ">
                <p className="m-0 p-0">{t("trackShipment.OUT_TO_DELIVERED")}</p>
                <p className={`${styles.spanCancel} m-0 p-0`}>
                  {status === "CANCELLED" && t("trackShipment.CANCELLED")}
                </p>
              </div>
              <div className="col-3 m-0 p-0 text-center">
                {t("trackShipment.DELIVERED")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getProgressBarColor(percentage: number): string {
  if (percentage <= 0) {
    return "bg-success";
  } else if (percentage <= 38) {
    return "bg-warning text-dark";
  } else if (percentage <= 63) {
    return "bg-danger text-dark";
  } else {
    return "bg-success";
  }
}

export default ProgressBar;
