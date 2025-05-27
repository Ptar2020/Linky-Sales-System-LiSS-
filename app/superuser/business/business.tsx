"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/AuthProvider";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { BusinessInterface, UserInterface } from "@/app/types";
import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";

const AddBusinessPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessInterface[]>([]);
  const [businessData, setBusinessData] = useState<{ name: string }>({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  console.log(user);
  // Fetch all businesses
  const getBusinesses = async () => {
    try {
      setFetching(true);
      const response = await fetch("/api/business", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data: BusinessInterface[] = await response.json();
        setBusinesses(data);
      } else {
        showErrorMsg("Failed to fetch businesses");
      }
    } catch (error) {
      showErrorMsg(error instanceof Error ? error.message : "Network error");
    } finally {
      setFetching(false);
    }
  };

  // Add a new business
  const addBusiness = async () => {
    if (!businessData.name.trim()) {
      showErrorMsg("Business name is required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessData),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        showSuccessMsg(data.success || "Business added successfully");
        setBusinessData({ name: "" });
        await getBusinesses();
      } else {
        showErrorMsg(data.msg || "Failed to add business");
      }
    } catch (error) {
      showErrorMsg(error instanceof Error ? error.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Delete a business with confirmation
  const deleteBusiness = async (id: string) => {
    if (!confirm(`Are you sure you want to delete business ${id}?`)) return;
    setDeletingId(id);
    try {
      const response = await fetch(`/api/business/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        showSuccessMsg(data.success || "Business deleted successfully");
        await getBusinesses();
      } else {
        showErrorMsg(data.msg || "Failed to delete business");
      }
    } catch (error) {
      showErrorMsg(error instanceof Error ? error.message : "Network error");
    } finally {
      setDeletingId(null);
    }
  };

  // Restrict access to superusers or admins
  useEffect(() => {
    if (!user || (!user.is_admin && !user.is_superuser)) {
      showErrorMsg("Restricted operation. Contact admin.");
      const timer = setTimeout(() => router.push("/login"), 1000);
      return () => clearTimeout(timer);
    }
    getBusinesses();
  }, [router, user]);

  return (
    <div className="business">
      <h2 className="">BUSINESS MANAGEMENT</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBusiness();
        }}
      >
        <div className="">
          <label htmlFor="businessName">Business Name</label>
          <input
            id="businessName"
            type="text"
            value={businessData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBusinessData({ name: e.target.value })
            }
            placeholder="Enter business name"
            disabled={loading || fetching}
            required
            className="  p-2 border border-lightgray rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading || fetching || !businessData.name.trim()}
          className={`btn ${
            loading || fetching || !businessData.name.trim()
              ? "btn-disabled"
              : "btn-primary"
          } mt-4`}
        >
          {loading ? "Saving..." : "Save Details"}
        </button>
      </form>
      <h3>AVAILABLE BUSINESSES</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
            <th scope="col">Users</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business) => (
            <tr key={business._id}>
              <td>
                <Link href={`/business/${business._id}`}>{business.name}</Link>
              </td>
              <td>{new Date(business.createdAt).toLocaleDateString()}</td>
              <td>
                {user?.business._id === business._id ? (
                  <button disabled>Delete</button>
                ) : (
                  <button
                    onClick={() => deleteBusiness(business._id)}
                    className={`btn ${
                      deletingId === business._id
                        ? "btn-disabled"
                        : "btn-danger"
                    }`}
                    disabled={deletingId === business._id}
                  >
                    {deletingId === business._id ? "Deleting..." : "Delete"}
                  </button>
                )}
              </td>
              <td>{business._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddBusinessPage;
// "use client";
// import { showSuccessMsg } from "@/app/_utils/Alert";
// import { useAuth } from "@/app/_utils/AuthProvider";
// import Link from "next/link";
// import React, { ChangeEvent, useEffect, useState } from "react";

// const AddBusinessPage = () => {
//   const { user } = useAuth();
//   const [businesses, setBusinesses] = useState();
//   const [businessData, setBusinessData] = useState({
//     name: "",
//   });

//   const addBusiness = async () => {
//     const response = await fetch("/api/business", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(businessData),
//     });
//     const data = await response.json();
//     getBusinesses();
//     showSuccessMsg(data.success);
//   };

//   const getBusinesses = async () => {
//     const response = await fetch("/api/business");
//     const data = await response.json();
//     setBusinesses(data);
//   };

//   const deleteBusiness = async (id) => {
//     const response = await fetch(`/api/business/${id}`, {
//       method: "DELETE",
//       headers: { "Content-type": "application/json" },
//       credentials: "include",
//     });
//     const data = await response.json();
//     getBusinesses();
//     showSuccessMsg(data.success);
//   };

//   useEffect(() => {
//     getBusinesses();
//   }, []);

//   return (
//     <div>
//       <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
//         Back
//       </button>
//       <h3>NEW BUSINESS DETAILS</h3>
//       <label>
//         Business Name
//         <input
//           type="text"
//           defaultValue={businessData?.name}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setBusinessData({ ...businessData, name: e.target.value })
//           }
//           placeholder="Business Name"
//         />
//       </label>
//       <br /> <br />
//       <button onClick={addBusiness}>Save details</button>
//       <hr />
//       <h4>AVAILABLE BUSINESSES</h4>
//       {businesses?.map((business) => (
//         <p key={business?._id}>
//           <Link href={"/"}>{business.name}</Link>{" "}
//           {user?.business?._id !== business?._id ? (
//             <button onClick={() => deleteBusiness(business._id)}>Delete</button>
//           ) : (
//             <button disabled>Delete</button>
//           )}
//           <br />
//         </p>
//       ))}
//     </div>
//   );
// };

// export default AddBusinessPage;
