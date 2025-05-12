"use client";
import { useAuth } from "@/app/_utils/AuthProvider";
import React, { useCallback, useEffect, useState } from "react";

const LoadSales = () => {
  const { user } = useAuth();
  const [userSalesData, setUserSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSales = useCallback(async () => {
    const response = await fetch(`/api/sales/${user?._id}`);
    const data = await response.json();
    console.log(data);
    setUserSalesData(data);
    setLoading(false);
  }, [user?._id]);

  useEffect(() => {
    if (user) {
      getSales();
    }
  }, [user, getSales]);

  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      {loading ? (
        <p>Data loading...</p>
      ) : (
        <>
          <p>Sales by {user?.username} </p>
          {userSalesData?.map((sale, id) => (
            <p key={sale.id}>
              {id + 1} - {sale?.product?.name} -{" "}
              {sale?.sale_date.toLocaleString()} - {sale?.product?.price}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default LoadSales;
