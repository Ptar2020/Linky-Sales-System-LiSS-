"use client";
import { showErrorMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import { SaleInterface } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

const BusinessSales = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [sales, setSales] = useState<SaleInterface[]>([]);
  console.log(user);

  const getSales = useCallback(async () => {
    // This gets a businesses sales only
    try {
      const response = await fetch(
        `/api/sales/${user?.business?._id}/business`
      );
      const data = await response.json();
      setSales(data);
    } catch (error) {
      showErrorMsg(
        error instanceof Error ? error.message : "Error experienced"
      );
    }
  }, [user?.business?._id]);

  useEffect(() => {
    getSales();
  }, [getSales]);

  return (
    <div>
      {user && (
        <>
          <h3>ALL SALES</h3>
          {sales.map((sale) => (
            <p key={sale._id}>
              {sale.seller?.username} - {sale?.product?.name} -{" "}
              {sale?.product?.price} -{sale.sale_date.toString()}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default BusinessSales;
