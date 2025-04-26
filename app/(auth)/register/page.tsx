import React from "react";
import { Metadata } from "next";
import RegisterPage from "./register";

export const generateMetadata = (): Metadata => {
  return {
    title: "Register to LiSS",
    description: "Please register your details here",
  };
};
const Register = () => {
  return (
    <div>
      <RegisterPage />
    </div>
  );
};

export default Register;
