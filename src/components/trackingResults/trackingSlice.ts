// store/trackingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TrackingResultService } from "./trackingResults.service";
import { TrackingData } from "./trackingTypes";

interface TrackingState {
  data: TrackingData | null; // Use TrackingData interface here
  isLoading: boolean;
  error: string | null;
}

const initialState: TrackingState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchTrackingData = createAsyncThunk(
  "tracking/fetchData",
  async (trackingNumber: string) => {
    try {
      const newTrackingNumber = parseInt(trackingNumber, 10); // Assuming base 10
      return await TrackingResultService.getTrackingResult(newTrackingNumber);
    } catch (error) {
      throw Error(error.response?.data?.message || "Unknown error occurred");
    }
  }
);

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackingData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrackingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrackingData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default trackingSlice.reducer;
