"use client";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import { UserInterface } from "@/app/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [newUserData, setNewUserData] = useState<Partial<UserInterface>>({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect non-admin users
  useEffect(() => {
    if (!user?.is_admin && !user?.is_superuser) {
      showErrorMsg("Restricted operation. Contact admin.");
      router.push("/");
    }
  }, [router, user]);

  // Form validation
  const isDisabled =
    loading ||
    !newUserData?.username?.trim() ||
    !newUserData?.email?.trim() ||
    !newUserData?.password ||
    newUserData?.password !== passwordConfirm ||
    !newUserData?.gender ||
    !user?.business?._id;

  // Construct body with null checks
  const body =
    user?.business?._id && user?._id
      ? {
          username: newUserData?.username,
          email: newUserData?.email,
          password: newUserData?.password,
          gender: newUserData?.gender,
          business: user?.business._id,
        }
      : null;

  const newUser = async () => {
    if (!body) {
      showErrorMsg("User or business data missing");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/user/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        showSuccessMsg(data.msg || "User registered successfully");
        setNewUserData({ username: "", email: "", password: "", gender: "" });
        setPasswordConfirm("");
        router.push("/login");
      } else {
        showErrorMsg(data.msg || "Failed to register user");
      }
    } catch (error) {
      showErrorMsg(error instanceof Error ? error.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!user?.is_admin && !user?.is_superuser) {
    return <h4>Unauthorized access</h4>;
  }

  return (
    <main className="register">
      <h2> NEW USER</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newUser();
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={newUserData?.username || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewUserData({ ...newUserData, username: e.target.value })
            }
            placeholder="Enter username"
            disabled={loading}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={newUserData?.email || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewUserData({ ...newUserData, email: e.target.value })
            }
            placeholder="Enter email address"
            disabled={loading}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={newUserData?.password || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewUserData({ ...newUserData, password: e.target.value })
            }
            placeholder="Enter password"
            disabled={loading}
            required
            minLength={8}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirm(e.target.value)
            }
            placeholder="Confirm password"
            disabled={loading}
            required
            minLength={8}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={newUserData?.gender || ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setNewUserData({ ...newUserData, gender: e.target.value })
            }
            disabled={loading}
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          aria-disabled={isDisabled}
          className={`submit-button ${isDisabled ? "disabled" : ""}`}
        >
          {loading ? "Submitting..." : "Submit Details"}
        </button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </main>
  );
};

export default RegisterPage;

// "use client";
// import React, { ChangeEvent, useEffect, useState } from "react";
// import Link from "next/link";
// import { showSuccessMsg, showErrorMsg } from "@/app/_utils/Alert";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/_utils/AuthProvider";

// const RegisterPage = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   // const [businesses, setBusinesses] = useState();
//   const [added, setAdded] = useState(true);
//   const [newUserData, setNewUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     password1: "",
//     gender: "",
//     // business: "",
//   });

//   const body = {
//     username: newUserData?.username,
//     password: newUserData.password,
//     email: newUserData.email,
//     gender: newUserData.gender,
//     // business: newUserData.business,
//     business: user?.business._id,
//   };
//   // Retrieve all buinesses
//   // const getBusinesses = async () => {
//   //   const response = await fetch("/api/business");
//   //   const data = await response.json();
//   //   setBusinesses(data);
//   // };

//   const newUser = async () => {
//     /**
//      * Create new user
//      */
//     try {
//       setAdded(false); //To enable the submit button show active/inactive
//       const response = await fetch("/api/user/new", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         showSuccessMsg(data.msg);
//         router.push("/login"); //Reroute to the login page
//       } else {
//         showErrorMsg("Error experienced trying to add a new user");
//       }
//     } catch (error) {
//       showErrorMsg(error);
//     } finally {
//       setAdded(true);
//     }
//   };

//   useEffect(() => {
//     // getBusinesses();
//     if (!user?.is_admin || !user?.is_superuser) {
//       alert("Impossible operation. Contact admin");
//       router.push("/login");
//     }
//   }, [user]);

//   return (
//     <div>
//       <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
//         Back
//       </button>
//       <h3>Register</h3>
//       <p>Username</p>
//       <input
//         type="text"
//         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//           setNewUserData({ ...newUserData, username: e.target.value })
//         }
//         placeholder="Your username"
//       />
//       <br />
//       <p>Password</p>
//       <input
//         type="password"
//         value={newUserData.password}
//         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//           setNewUserData({ ...newUserData, password: e.target.value })
//         }
//         placeholder="Your password"
//       />
//       <br />
//       <p>Email</p>
//       <input
//         type="email"
//         value={newUserData.email}
//         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//           setNewUserData({ ...newUserData, email: e.target.value })
//         }
//         placeholder="Your email address"
//       />
//       <br />
//       <p>Gender</p>
//       <select
//         value={newUserData.gender}
//         onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//           setNewUserData({ ...newUserData, gender: e.target.value })
//         }
//       >
//         <option>Select gender</option>
//         <option value={"Male"}>Male</option>
//         <option value={"Female"}>Female</option>
//         <option value={"Other"}>Other</option>
//       </select>
//       <br />
//       {/* <select
//         value={newUserData.business}
//         onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//           setNewUserData({ ...newUserData, business: e.target.value })
//         }
//       >
//         <option>Select Business</option>
//         {businesses?.map((business) => (
//           <option key={business._id} value={business._id}>
//             {business.name}
//           </option>
//         ))}
//       </select> */}
//       <br />

//       <button onClick={newUser} disabled={!added}>
//         Submit Details
//       </button>
//       <p>
//         <Link href="/login">Login</Link> if you have an account
//       </p>
//     </div>
//   );
// };

// export default RegisterPage;
