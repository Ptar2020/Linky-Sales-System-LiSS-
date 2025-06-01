"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../_utils/AuthProvider";

const SuperuserHeader = () => {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <div className="superuserHeader" style={{ textAlign: "center" }}>
      <h2>ADMIN AREA</h2>
      <Link href={"/superuser/users"}>Users</Link>
      {user?.is_superuser && (
        <>
          <Link href="/superuser/business">Businesses</Link>
          <Link href="/superuser/sales">Sales</Link>
        </>
      )}
      <Link href="/superuser/register">New User</Link>
    </div>
  );
};

export default SuperuserHeader;
