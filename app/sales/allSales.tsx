"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllSales = () => {
  const router = useRouter();
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(true);

  const getAllSales = async () => {
    const response = await fetch("/api/sales");
    const data = await response.json();
    console.log(data);
    setSales(data);

    setLoading(false);
  };

  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading sales data</p>
      ) : (
        <>
          <p>General users sales </p>
          {sales?.map((sale) => (
            <Link href={`/sales/${sale.id}`} key={sale.id}>
              {" "}
              {sale.name} - {sale.amount}
              <br />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default AllSales;
