"use client";
import { useAuth } from "@/app/_utils/AuthProvider";
import { SaleInterface } from "@/app/types";
import React, { useCallback, useEffect, useState } from "react";

const LoadSales = () => {
  const { user } = useAuth();
  const [userSalesData, setUserSalesData] = useState<SaleInterface[]>([]);
  const [loading, setLoading] = useState(true);
  ``;

  const getSales = useCallback(async () => {
    const response = await fetch(`/api/sales/${user?._id}`);
    const data: SaleInterface[] = await response.json();
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
          <h3>MY SALES RECORDS </h3>
          <table>
            <thead>
              <th>Item</th> <th>Price</th> <th>Sale date</th>
            </thead>
            <tbody>
              {userSalesData &&
                userSalesData?.map((sale) => (
                  <tr key={sale._id}>
                    <td> {sale?.product?.name}</td>{" "}
                    <td>{sale?.product?.price}</td>
                    <td> {sale?.sale_date.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default LoadSales;
