"use client";
import React, { useState, useEffect } from "react";

// All business sales
const AllSales = () => {
  const [sales, setSales] = useState();

  const getSales = async () => {
    const response = await fetch("/api/sales");
    const data = await response.json();
    setSales(data);
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      <h2>ALL SALES</h2>
      {sales?.map((sale) => (
        <p key={sale._id}>{sale.seller}</p>
      ))}
    </div>
  );
};

export default AllSales;
