import React from "react";
import styles from "./stepper.module.css";

interface ProgressBarProps {
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ status }) => {
  let percentage = 0;

  switch (status) {
    case "DELIVERED_TO_SENDER":
      percentage = 25;
      break;
    case "CANCELLED":
      percentage = 50;
      break;
    case "DELIVERED":
      percentage = 75;
      break;
    case "CREATED":
      percentage = 100;
      break;
    default:
      percentage = 0;
  }

  return (
    <div className="col-12 border border-secondary-subtle p-0 border-opacity-25 ">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="row">
                <div className="col-3">asd</div>
                <div className="col-3">asd</div>
                <div className="col-3">asd</div>
                <div className="col-3">asd</div>
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
            >
              <div className={styles.circle}>{percentage}%</div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="container">
            <div className="row">
              <div className="col-3">asd</div>
              <div className="col-3">asd</div>
              <div className="col-3">asd</div>
              <div className="col-3">asd</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getProgressBarColor(percentage: number): string {
  if (percentage <= 25) {
    return "bg-success";
  } else if (percentage <= 50) {
    return "bg-info text-dark";
  } else if (percentage <= 75) {
    return "bg-warning text-dark";
  } else {
    return "bg-danger";
  }
}

export default ProgressBar;
