import React from "react";
import { useTranslation } from "react-i18next";
import { TrackingData } from "../trackingResults/trackingTypes";
import mark from "../../assets/images/mark.png";
import styles from "./order-details.module.css";

interface OrderDetailsProps {
  data: TrackingData;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ data }) => {
  const { t } = useTranslation();

  const hub = data.TransitEvents?.map((item) => item.hub).filter(Boolean);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-7">
          <h5 className={styles.heading}>
            {t("orderDetails.shipmentDetails")}
          </h5>
          <table className={`${styles["table-border"]} table border`}>
            <thead className="table-light">
              <tr>
                <th className={styles.headingTable} scope="col">
                  {t("orderDetails.branch")}
                </th>
                <th className={styles.headingTable} scope="col">
                  {t("orderDetails.date")}
                </th>
                <th className={styles.headingTable} scope="col">
                  {t("orderDetails.time")}
                </th>
                <th className={styles.headingTable} scope="col">
                  {t("orderDetails.details")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.headingTableTd}>
                  {hub?.[0] === "Cairo Sorting Facility" &&
                    t("addresses.cairoSortingFacility")}
                </td>
                <td className={styles.headingTableTd}>
                  {new Date(data.CurrentStatus.timestamp).toLocaleDateString()}
                </td>
                <td className={styles.headingTableTd}>
                  {new Date(data.CurrentStatus.timestamp).toLocaleString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className={styles.headingTableTd}>
                  {data.CurrentStatus.state === "DELIVERED" &&
                    t("trackShipment.DELIVERED")}
                  {data.CurrentStatus.state === "DELIVERED_TO_SENDER" &&
                    t("trackShipment.DELIVERED_TO_SENDER")}
                  {data.CurrentStatus.state === "CANCELLED" &&
                    t("trackShipment.CANCELLED")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 col-lg-5">
          <h5 className={styles.heading}>
            {t("orderDetails.deliveryAddress")}
          </h5>
          <div className="card text-bg-light mb-3">
            <div className="card-body">
              <p className={`${styles.headingTableTd} card-text`}>
                امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 22
              </p>
            </div>
          </div>
          <div className="card  mb-3">
            <div className="card-body">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-3 p-0">
                    <img className="w-100" src={mark} alt="Mark" />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center gap-3 col-9">
                    <h5
                      className={`${styles.heading} m-0`}
                      style={{ fontSize: "15px", fontWeight: "800" }}
                    >
                      {t("orderDetails.problem")}
                    </h5>
                    <button
                      type="button"
                      className={`${styles.btnProblem} btn btn-danger`}
                    >
                      {t("orderDetails.reportProblem")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
