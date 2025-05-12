"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "./_utils/AuthProvider";

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="welcome">
      <br />
      <h1>WELCOME!</h1>
      <h2>LiSS</h2>
      <h2>(LINKITS SALES SYSTEM)</h2>
      <br />
      <p>
        Here, you get records for all the item sales by employees or yourself in
        your business
      </p>
      <div
        className="flex justify-center items-center"
        style={{ display: "flex" }}
      >
        {!user?._id && (
          <Link style={{ marginRight: "2%" }} href="/login">
            Start
          </Link>
        )}
        <Link href="/about">About</Link>
      </div>
      <hr style={{ width: "80%" }} />
    </div>
  );
};
export default Home;
