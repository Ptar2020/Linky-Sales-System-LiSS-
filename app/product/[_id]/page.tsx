"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/app/_utils/AuthProvider";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { ProductInterface } from "@/app/types";
import NewProduct from "./newProduct";
import swal from "sweetalert";

const BusinessProducts: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNewProduct, setShowNewProduct] = useState(false);

  // Fetch all products for the business
  const getBusinessProducts = useCallback(async () => {
    if (!user?.business?._id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/product/${user.business._id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: ProductInterface[] = await response.json();
      setProducts(data);
    } catch (err) {
      showErrorMsg(err instanceof Error ? err.message : "Error experienced");
    } finally {
      setLoading(false);
    }
  }, [user?.business?._id]);

  // Sell a product
  const sellProduct = async (productId: string) => {
    if (!user?._id) {
      showErrorMsg("User not authenticated");
      return;
    }

    const saleData = {
      seller: user._id,
      product: productId,
      sale_date: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to record sale");
      }
      const data = await response.json();
      showSuccessMsg(data.success);
      await getBusinessProducts(); // Refresh products after selling
    } catch (err) {
      showErrorMsg(err instanceof Error ? err.message : "Error recording sale");
    }
  };

  const editProduct = async (_id: string) => {
    const response = await fetch(`/api/product/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    getBusinessProducts();
    showSuccessMsg(data.success);
  };

  const deleteProduct = async (_id: string) => {
    const confirm = await swal({
      buttons: ["Cancel", "Ok"],
      title: "Sure to delete product?",
      icon: "warning",
      dangerMode: true,
    });
    if (confirm) {
      const response = await fetch(`/api/product/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      getBusinessProducts();
      showSuccessMsg(data.success);
    }
  };

  const handleShowNewProduct = () => {
    setShowNewProduct(!showNewProduct);
  };

  useEffect(() => {
    if (user?.business?._id) {
      getBusinessProducts();
    } else {
      setLoading(false);
    }
  }, [user, getBusinessProducts]);

  return (
    <div>
      <h2> {user?.business.name} PRODUCTS</h2>
      <button onClick={handleShowNewProduct}>New product</button>
      {showNewProduct && <NewProduct />}{" "}
      {loading && (
        <div>
          <p>Loading products...</p>
        </div>
      )}
      {!loading && products.length === 0 && (
        <div>
          <p>No products found.</p>
        </div>
      )}
      {!loading && products.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {product.available ? "Available" : "Sold"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.description || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => sellProduct(product._id)}
                      disabled={!product.available}
                      className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                        product.available
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-300 text-gray-500 "
                      }`}
                    >
                      Sell
                    </button>{" "}
                    ||
                    <button
                      onClick={() => editProduct(product._id)}
                      disabled={!product.available}
                      className={`py-2 px-4 rounded-lg font-semibold transition-colors`}
                    >
                      Edit
                    </button>{" "}
                    ||
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className={`py-2 px-4 rounded-lg font-semibold transition-colors`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusinessProducts;
