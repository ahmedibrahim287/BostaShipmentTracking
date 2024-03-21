import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TrackingResultService } from "./trackingResults.service";
import { TrackingData } from "./trackingTypes";

interface TrackingState {
  data: TrackingData | null;
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
  async (trackingNumber: string, { rejectWithValue }) => {
    try {
      const newTrackingNumber = parseInt(trackingNumber, 10); // Assuming base 10
      return await TrackingResultService.getTrackingResult(newTrackingNumber);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unknown error occurred"
      );
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
        state.error = null; // Clear error state when request starts
      })
      .addCase(fetchTrackingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null; // Clear error state on successful request
      })
      .addCase(fetchTrackingData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Set error state on rejected request
      });
  },
});

export default trackingSlice.reducer;
