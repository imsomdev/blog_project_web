import { configureStore } from "@reduxjs/toolkit";
import pollSlice from "./pollSlice.utils";

const store = configureStore({
  reducer: { poll: pollSlice },
});

export default store;
