"use client";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import { ProductInterface } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, ChangeEvent } from "react";

const NewProduct = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [productDetails, setProductDetails] = useState<
    Partial<ProductInterface>
  >({
    name: "",
    price: 0,
    description: "",
  });

  const body = {
    business: user?.business._id,
    name: productDetails.name,
    price: productDetails.price,
    description: productDetails.description,
    added_by: user?._id,
  };

  const isDisabled =
    !productDetails || !productDetails.name?.trim() || !productDetails.price;

  const addProduct = async () => {
    const response = await fetch("/api/product/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      showSuccessMsg(data.success);
    } else {
      const data = await response.json();
      showErrorMsg(data.msg);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
    }
  }, [router, user]);

  return (
    <div>
      {user ? (
        <>
          <button
            style={{ marginRight: "34px" }}
            onClick={() => history.back()}
          >
            Back
          </button>
          <h2>NEW PRODUCT DETAILS</h2>
          <label>
            {" "}
            Name
            <br />
            <input
              type="text"
              value={productDetails?.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProductDetails({ ...productDetails, name: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            {" "}
            Price
            <br />
            <input
              type="number"
              value={productDetails?.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProductDetails({ ...productDetails, price: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            {" "}
            Description <br />
            <textarea
              type="text"
              value={productDetails?.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProductDetails({
                  ...productDetails,
                  description: e.target.value,
                })
              }
            ></textarea>
          </label>
          <br />
          <br />
          <button disabled={isDisabled} onClick={addProduct}>
            Save Details
          </button>
          <br /> <br />
        </>
      ) : (
        <h4>Unauthorized access</h4>
      )}
    </div>
  );
};

export default NewProduct;
