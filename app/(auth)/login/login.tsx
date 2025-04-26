"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/"), 5000;
  };
  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      <br />
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

export default LoginPage;
