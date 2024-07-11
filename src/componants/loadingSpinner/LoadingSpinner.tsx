import { Spinner } from "@nextui-org/react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <Spinner color="primary" labelColor="primary" />
    </div>
  );
};

export default LoadingSpinner;
