"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../_utils/AuthProvider";
import { showSuccessMsg } from "../_utils/Alert";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const logOut = async () => {
    const response = await fetch("/api/user/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    showSuccessMsg(data.success);
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="header">
      <Link className="nav-link" href="/">
        {user?.business.name}
      </Link>

      <Link className="nav-link" href="/about">
        About
      </Link>
      {user && (
        <>
          <Link
            className="nav-link"
            href={`/product/${user?.business?._id}`}
            title="All the business products. "
          >
            Products
          </Link>
          <Link
            className="nav-link"
            href={`/sales/${user?._id}`}
            title="All my product sales. "
          >
            MySales
          </Link>
        </>
      )}
      {/* For adding new products */}
      {/* {user?.is_active && ( */}
      <></>
      {/* )} */}
      {user?.is_superuser && (
        <Link className="nav-link" href={"/superuser"}>
          Superuser
        </Link>
      )}

      {user?._id ? (
        <button onClick={logOut} className="nav-link">
          Logout ({user?.username})
        </button>
      ) : (
        <Link className="nav-link" href="/login">
          Login
        </Link>
      )}
      <hr />
    </div>
  );
};
export default Navbar;
