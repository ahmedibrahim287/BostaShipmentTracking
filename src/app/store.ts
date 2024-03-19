// store/index.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import trackingReducer from "../components/trackingResults/trackingSlice";

const store = configureStore({
  reducer: {
    tracking: trackingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
