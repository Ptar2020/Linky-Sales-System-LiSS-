import React, { Suspense } from "react";
import LoadSales from "./LoadSales";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    //Find out how to include other properties other than id
    title: "Title",
    description: "Particular user sales data",
  };
};
const UserSales = () => {
  return (
    // <Suspense fallback={<p>User sales data loading...</p>}> //Currently not working
    <LoadSales />
    // </Suspense>
  );
};

export default UserSales;
