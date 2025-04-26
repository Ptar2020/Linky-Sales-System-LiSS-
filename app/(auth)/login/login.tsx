"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/_utils/AuthProvider";
import { showErrorMsg } from "@/app/_utils/Alert";

const LoginPage = () => {
  const { setUser } = useAuth();
  const [logging, setLogging] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLogging(true);
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const data = await response.json();
        setUser(data);
        console.log(data);
      } else {
        alert("Erro logging in");
      }
    } catch (error) {
      showErrorMsg(error.msg);
    } finally {
      setLogging(false);
    }
  };
  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      <br />
      <label>Username</label>
      <br />
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUserData({ ...userData, username: e.target.value })
        }
        placeholder="Your nusername"
      />{" "}
      <br />
      <label>Password</label>
      <br />
      <input
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUserData({ ...userData, password: e.target.value })
        }
        placeholder="Your password"
      />{" "}
      <br />
      <button disabled={logging} onClick={handleSubmit}>
        Submit
      </button>
      <hr style={{ width: "50%" }} />
      No account yet, <Link href="/register">Register here</Link>
    </div>
  );
};

export default LoginPage;
