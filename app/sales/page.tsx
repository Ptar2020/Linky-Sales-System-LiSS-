import React, { useState, useEffect } from "react";
import AllSales from "./allSales";
import { Metadata } from "next";

export const generateMetadata = () => {
  return { title: "All business sales" };
};

// All business sales
const Sales = () => {
  return (
    <div>
      <AllSales />
    </div>
  );
};

export default Sales;
