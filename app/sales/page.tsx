import React from "react";
import { Metadata } from "next";
import AllSales from "./allSales";

export const generateMetadata = (): Metadata => {
  return {
    title: "All sales data",
    description: "Sales records for all the sellers/users",
  };
};

const Sales = () => {
  return <AllSales />;
};

export default Sales;
