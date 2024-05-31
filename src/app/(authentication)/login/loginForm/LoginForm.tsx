"use client";
import ProfileServices from "@/services/profile.services";
import React, { useState } from "react";
import { json } from "stream/consumers";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    console.log(userData, "INITIAL DATA");
    const submit = await ProfileServices.login(userData);
    console.log("data:" + submit, "DATA");
    // const token = submit?.jwt;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Password </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
