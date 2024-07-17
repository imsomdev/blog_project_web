import { createSlice } from "@reduxjs/toolkit";

const pollSlice = createSlice({
  name: "poll",
  initialState: {
    count: 0,
  },
  reducers: {
    increase: (state) => {
      state.count++;
    },
    decrease: (state) => {
      state.count--;
    },
  },
});

export const { increase, decrease } = pollSlice.actions;

export default pollSlice.reducer;
