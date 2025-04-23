import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div className="header">
      <Link className="nav-link" href="/">
        Home
      </Link>
      <Link className="nav-link" href="/sales">
        Sales
      </Link>
      <Link className="nav-link" href="/about">
        About
      </Link>
      <Link className="nav-link" href="/login">
        Login
      </Link>
      <hr />
    </div>
  );
};
export default Header;
