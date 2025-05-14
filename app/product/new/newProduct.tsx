"use client";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import { ProductInterface } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";

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
  const [loading, setLoading] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  // Validate form
  const isDisabled =
    !productDetails ||
    !productDetails.name?.trim() ||
    productDetails.price <= 0;

  // Construct body with null checks
  const body =
    user?.business?._id && user?._id
      ? {
          business: user.business._id,
          name: productDetails.name,
          price: productDetails.price,
          description: productDetails.description,
          added_by: user._id,
        }
      : null;

  const addProduct = async () => {
    if (!body) {
      showErrorMsg("User or business data missing");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/product/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        showSuccessMsg(data.success || "Product created successfully");
        setProductDetails({ name: "", price: 0, description: "" }); // Reset form
        router.push("/products"); // Redirect to product list
      } else {
        showErrorMsg(data.msg || "Failed to create product");
      }
    } catch (error) {
      showErrorMsg(error instanceof Error ? error.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <h4>Unauthorized access</h4>;
  }

  return (
    <main className="new-product-container">
      <button
        type="button"
        onClick={() => router.back()}
        className="back-button"
        disabled={loading}
      >
        Back
      </button>
      <h2>Create New Product</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addProduct();
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={productDetails.name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductDetails({ ...productDetails, name: e.target.value })
            }
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={productDetails.price || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductDetails({
                ...productDetails,
                price: parseFloat(e.target.value) || 0,
              })
            }
            disabled={loading}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={productDetails.description || ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setProductDetails({
                ...productDetails,
                description: e.target.value,
              })
            }
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled || loading}
          aria-disabled={isDisabled || loading}
          className={`save-button ${isDisabled || loading ? "disabled" : ""}`}
        >
          {loading ? "Saving..." : "Save Details"}
        </button>
      </form>

      <style jsx>{`
        .new-product-container {
          max-width: 500px;
          margin: 20px auto;
          padding: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input,
        textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        .back-button,
        .save-button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .back-button {
          background-color: #6c757d;
          color: white;
          margin-bottom: 20px;
        }
        .save-button {
          background-color: #007bff;
          color: white;
        }
        .save-button:disabled,
        .back-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  );
};

export default NewProduct;

// "use client";
// import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
// import { useAuth } from "@/app/_utils/AuthProvider";
// import { ProductInterface } from "@/app/types";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect, ChangeEvent } from "react";

// const NewProduct = () => {
//   const router = useRouter();
//   const { user } = useAuth();

//   const [productDetails, setProductDetails] = useState<
//     Partial<ProductInterface>
//   >({
//     name: "",
//     price: 0,
//     description: "",
//   });

//   const body = {
//     business: user?.business._id,
//     name: productDetails.name,
//     price: productDetails.price,
//     description: productDetails.description,
//     added_by: user?._id,
//   };

//   const isDisabled =
//     !productDetails || !productDetails.name?.trim() || !productDetails.price;

//   const addProduct = async () => {
//     const response = await fetch("/api/product/new", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       showSuccessMsg(data.success);
//     } else {
//       const data = await response.json();
//       showErrorMsg(data.msg);
//     }
//   };

//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     } else {
//     }
//   }, [router, user]);

//   return (
//     <div>
//       {user ? (
//         <>
//           <button
//             style={{ marginRight: "34px" }}
//             onClick={() => history.back()}
//           >
//             Back
//           </button>
//           <h2>NEW PRODUCT DETAILS</h2>
//           <label>
//             {" "}
//             Name
//             <br />
//             <input
//               type="text"
//               value={productDetails?.name}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setProductDetails({ ...productDetails, name: e.target.value })
//               }
//             />
//           </label>
//           <br />
//           <label>
//             {" "}
//             Price
//             <br />
//             <input
//               type="number"
//               value={productDetails?.price}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setProductDetails({ ...productDetails, price: e.target.value })
//               }
//             />
//           </label>
//           <br />
//           <label>
//             {" "}
//             Description <br />
//             <textarea
//               type="text"
//               value={productDetails?.description}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setProductDetails({
//                   ...productDetails,
//                   description: e.target.value,
//                 })
//               }
//             ></textarea>
//           </label>
//           <br />
//           <br />
//           <button disabled={isDisabled} onClick={addProduct}>
//             Save Details
//           </button>
//           <br /> <br />
//         </>
//       ) : (
//         <h4>Unauthorized access</h4>
//       )}
//     </div>
//   );
// };

// export default NewProduct;
