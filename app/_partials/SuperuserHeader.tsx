"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../_utils/AuthProvider";

const SuperuserHeader = () => {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <div style={{ textAlign: "center" }}>
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-charcoal">ADMIN AREA</h2>
        <nav className="flex flex-wrap gap-3">
          {/* <button onClick={() => router.back()}>Back</button> */}
          <Link href={"/superuser"}>Users</Link>
          {user?.is_superuser && (
            <>
              <Link href="/superuser/business">Businesses</Link>
              <Link href="/superuser/about">About</Link>
            </>
          )}
          <Link href="/superuser/product/new">New Product</Link>
          <Link href="/superuser/register">Register User</Link>
        </nav>
      </header>
    </div>
  );
};

export default SuperuserHeader;
