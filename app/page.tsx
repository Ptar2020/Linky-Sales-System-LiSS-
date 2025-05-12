import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Home from "./home";

export const generateMetadata = (): Metadata => {
  return {
    title: "Linky Sales System[LiSS]",
    description: "This is where enterpreneurs manage their businesses",
  };
};
const Page = () => {
  return <Home />;
};
export default Page;
