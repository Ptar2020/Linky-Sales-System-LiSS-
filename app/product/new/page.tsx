import React, { Suspense } from "react";
import NewProduct from "./newProduct";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return { title: "New product", description: "Product description" };
};

const Product = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading new product page...</div>}>
        <NewProduct />
      </Suspense>
    </main>
  );
};

export default Product;
