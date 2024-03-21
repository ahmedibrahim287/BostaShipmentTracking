import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchTrackingData } from "./trackingSlice";
import { useNavigate } from "react-router-dom";

const TrackingResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="tracking-results">
      <form onSubmit={handleTrackingSubmit}>
        <input
          className="search form-control me-2"
          type="text"
          pattern="\d*"
          placeholder="Enter tracking number"
          aria-label="Enter tracking number"
          value={trackingNumber}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-outline-secondary">
          Track
        </button>
      </form>
    </div>
  );
};

export default TrackingResults;
