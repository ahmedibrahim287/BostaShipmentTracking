// components/TrackingResults.tsx
import React, { FormEvent, useState } from "react";
import { fetchTrackingData } from "./trackingSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

const TrackingResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(
    (state: RootState) => state.tracking
  );
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrackingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchTrackingData(trackingNumber));
  };

  console.log(data?.CurrentStatus.state);
  return (
    <div className="tracking-results">
      <form onSubmit={handleTrackingSubmit}>
        <input
          type="number"
          name="trackingNumber"
          placeholder="Enter tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button type="submit">Track</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
        <div className="tracking-details">
          <h2>Tracking Details</h2>
          <p>Tracking Number: {data.provider}</p>
          <p>CreateDate: {data.CreateDate}</p>
          <p>CurrentStatus.state: {data.CurrentStatus.state}</p>
          <p>CurrentStatus.timestamp: {data.CurrentStatus.timestamp}</p>
          <p>PromisedDate: {data.PromisedDate}</p>
          <p>SupportPhoneNumbers: {data.SupportPhoneNumbers}</p>
          <p>TrackingNumber: {data.TrackingNumber}</p>
          <p>TrackingURL: {data.TrackingURL}</p>
          <p>isEditableShipment: {data.isEditableShipment}</p>
          {/* Display other relevant tracking details */}
        </div>
      )}
    </div>
  );
};

export default TrackingResults;
