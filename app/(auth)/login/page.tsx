"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const handleSubmit = () => {
    alert("Login successful");
    router.push("/");
  };
  return (
    <div>
      <label>Username</label>
      <br />
      <input placeholder="Username" type="text" /> <br />
      <label>Password</label>
      <br />
      <input placeholder="Password" type="password" />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <hr style={{ width: "50%" }} />
      No account yet, <Link href="/register">Register here</Link>
    </div>
  );
};

export default Login;
