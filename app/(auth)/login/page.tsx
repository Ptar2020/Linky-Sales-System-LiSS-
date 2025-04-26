import React from "react";
import LoginPage from "./login";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "LiSS Login page",
    description: "Please input your credentials to have access",
  };
};
const Login = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Login;
