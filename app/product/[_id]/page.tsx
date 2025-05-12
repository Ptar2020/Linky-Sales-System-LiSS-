"use client";
import { useAuth } from "@/app/_utils/AuthProvider";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { showSuccessMsg } from "@/app/_utils/Alert";

const BusinessProducts = ({ params }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products for the business
  const getBusinessProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/product/${user?.business._id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.business._id]);

  // Sell a product
  const sellProduct = async (productId) => {
    const saleData = {
      seller: user?._id,
      product: productId,
      sale_date: new Date(),
    };

    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
        credentials: "include",
      });
      const data = await response.json();
      showSuccessMsg(data.success || "Product sold successfully");
      // Refresh products after selling
      getBusinessProducts();
    } catch (err) {
      console.error("Error selling product:", err);
      showSuccessMsg("Failed to sell product", err);
    }
  };

  useEffect(() => {
    if (user?.business?._id) {
      getBusinessProducts();
    }
  }, [user, getBusinessProducts]);

  // Filter products
  const availableProducts = products.filter((product) => product.available);
  const soldProducts = products.filter((product) => !product.available);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user?.business) return <p>No business found for this user.</p>;

  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      <h4>PRODUCTS</h4>

      {/* Available Products Table */}
      <h3>AVAILABLE PRODUCTS</h3>
      {availableProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.available.toString()}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => sellProduct(product._id)}>Sell</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No available products found.</p>
      )}

      {/* Sold Products Table */}
      <h3>SOLD PRODUCTS</h3>
      {soldProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {soldProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.available.toString()}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sold products found.</p>
      )}
    </div>
  );
};

export default BusinessProducts;

// "use client";
// import { useAuth } from "@/app/_utils/AuthProvider";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { showSuccessMsg } from "@/app/_utils/Alert";

// // Get all products for the businessId
// const BusinessProducts = ({ params }) => {
//   const { user } = useAuth();
//   const [products, setProducts] = useState();
//   const [productId, setProductId] = useState();

//   const saleData = {
//     seller: user?._id,
//     product: productId,
//     sale_date: Date(),
//   };
//   const getBusinessProducts = async () => {
//     const response = await fetch(`/api/product/${user?.business._id}`);
//     const data = await response.json();
//     setProducts(data);
//   };

//   const sellProduct = async (id) => {
//     setProductId(id);
//     console.log(saleData);
//     const response = await fetch("/api/sales", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(saleData),
//       credentials: "include",
//     });
//     const data = await response.json();
//     showSuccessMsg(data.success);
//   };

//   useEffect(() => {
//     getBusinessProducts();
//   }, [user]);

//   return (
//     <div>
//       <h4>{user?.business.name} Products</h4>

//       <>
//         {/* Show all available products */}
//         <h3>AVAILABLE PRODUCTS</h3>
//         <table>
//           <thead>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Availability</th>
//             <th>Description</th>
//           </thead>
//           <tbody>
//             {products?.map((product) => (
//               <tr key={product._id}>
//                 <td>{product.name}</td>
//                 <td>{product.price}</td>
//                 <td>{product.available.toString()}</td>
//                 <td>{product.description}</td>
//                 <td>
//                   <button onClick={() => sellProduct(product._id)}>Sell</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </>
//       <>
//         <h3>SOLD PRODUCTS</h3>
//         <table>
//           <thead>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Availability</th>
//             <th>Description</th>
//           </thead>
//           <tbody>
//             {products?.map((product) => {
//               product.availability && (
//                 <>
//                   <tr key={product._id}>
//                     <td>{product.name}</td>
//                     <td>{product.price}</td>
//                     <td>{product.available.toString()}</td>
//                     <td>{product.description}</td>
//                     <td>
//                       <button onClick={() => sellProduct(product._id)}>
//                         Sell
//                       </button>
//                     </td>
//                   </tr>
//                 </>
//               );
//             })}
//           </tbody>
//         </table>
//       </>
//     </div>
//   );
// };

// export default BusinessProducts;
