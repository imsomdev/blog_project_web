import ChatInputOutput from "@/componants/chatInputOutput/ChatInputOutPut";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatInputOutput />
      </Suspense>
    </div>
  );
};

export default page;
