"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/app/_utils/AuthProvider";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { ProductInterface } from "@/app/types";

const BusinessProducts: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      showSuccessMsg(data.success || "Product sold successfully");
      await getBusinessProducts(); // Refresh products after selling
    } catch (err) {
      console.error("Error selling product:", err);
      showErrorMsg(err instanceof Error ? err.message : "Error recording sale");
    }
  };

  useEffect(() => {
    if (user?.business?._id) {
      getBusinessProducts();
    } else {
      setLoading(false);
    }
  }, [user, getBusinessProducts]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>

      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading products...</p>
        </div>
      )}

      {!loading && !user?.business && (
        <div className="text-center py-4">
          <p className="text-gray-600">No business found for this user.</p>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-600">No available products found.</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
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
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Sell
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
