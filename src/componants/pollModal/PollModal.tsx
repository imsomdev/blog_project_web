"use client";
import { decrease, increase } from "@/utils/pollSlice.utils";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const PollModal = () => {
  const count = useSelector((store: any) => store.poll.count);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increase());
  };

  const handleDecrease = () => {
    dispatch(decrease());
  };

  return (
    <div>
      count = {count}
      <span>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
      </span>
    </div>
  );
};

export default PollModal;
