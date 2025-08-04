import React from "react";
import LoginForm from "./loginForm/LoginForm";

const page = () => {
  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4">
        <LoginForm />
      </div>
    </main>
  );
};

export default page;
