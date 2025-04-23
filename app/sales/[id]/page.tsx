import React, { Suspense } from "react";
import LoadSales from "./LoadSales";
import { Metadata } from "next";

export const generateMetadata = ({ params }): Metadata => {
  return {//Find out how to include other properties other than id
    title: params.id,
    description: "Particular user sales data",
  };
};
const UserSales = ({ params }) => {
  return (
    // <Suspense fallback={<p>User sales data loading...</p>}> //Currently not working
    <LoadSales userId={params.id} />
    // </Suspense>
  );
};

export default UserSales;
