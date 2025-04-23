"use client";
import React, { useEffect, useState } from "react";

const LoadSales = ({ userId }) => {
  const [userSalesData, setUserSalesData] = useState();
  const [loading, setLoading] = useState(true);

  const getSales = async () => {
    const response = await fetch(`/api/sales/${userId}`);
    const data = await response.json();
    setUserSalesData(data);
    setLoading(false);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   getSales();
    // }, 4000);
    getSales();
  }, []);

  return (
    <div>
      {loading ? <p>Data loading...</p> 
      : <>
      <p>{userSalesData?.user} sales</p>
      {userSalesData?.salesData?.map((sale, id) => (
        <p key={sale.id}>
          {id + 1} - {sale.total}
        </p>
      ))}</>}
    </div>
  );
};

export default LoadSales;
