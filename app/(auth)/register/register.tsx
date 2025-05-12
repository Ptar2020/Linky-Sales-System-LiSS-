"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { showSuccessMsg, showErrorMsg } from "@/app/_utils/Alert";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/AuthProvider";

const RegisterPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  // const [businesses, setBusinesses] = useState();
  const [added, setAdded] = useState(true);
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
    password1: "",
    gender: "",
    // business: "",
  });

  const body = {
    username: newUserData?.username,
    password: newUserData.password,
    email: newUserData.email,
    gender: newUserData.gender,
    // business: newUserData.business,
    business: user?.business._id,
  };
  // Retrieve all buinesses
  // const getBusinesses = async () => {
  //   const response = await fetch("/api/business");
  //   const data = await response.json();
  //   setBusinesses(data);
  // };

  const newUser = async () => {
    /**
     * Create new user
     */
    try {
      setAdded(false); //To enable the submit button show active/inactive
      const response = await fetch("/api/user/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        showSuccessMsg(data.msg);
        router.push("/login"); //Reroute to the login page
      } else {
        showErrorMsg("Error experienced trying to add a new user");
      }
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setAdded(true);
    }
  };

  useEffect(() => {
    // getBusinesses();
    if (!user?.is_admin || !user?.is_superuser) {
      alert("Impossible operation. Contact admin");
      router.push("/login");
    }
  }, [user]);

  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      <h3>Register</h3>
      <p>Username</p>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewUserData({ ...newUserData, username: e.target.value })
        }
        placeholder="Your username"
      />
      <br />
      <p>Password</p>
      <input
        type="password"
        value={newUserData.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewUserData({ ...newUserData, password: e.target.value })
        }
        placeholder="Your password"
      />
      <br />
      <p>Email</p>
      <input
        type="email"
        value={newUserData.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewUserData({ ...newUserData, email: e.target.value })
        }
        placeholder="Your email address"
      />
      <br />
      <p>Gender</p>
      <select
        value={newUserData.gender}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setNewUserData({ ...newUserData, gender: e.target.value })
        }
      >
        <option>Select gender</option>
        <option value={"Male"}>Male</option>
        <option value={"Female"}>Female</option>
        <option value={"Other"}>Other</option>
      </select>
      <br />
      {/* <select
        value={newUserData.business}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setNewUserData({ ...newUserData, business: e.target.value })
        }
      >
        <option>Select Business</option>
        {businesses?.map((business) => (
          <option key={business._id} value={business._id}>
            {business.name}
          </option>
        ))}
      </select> */}
      <br />

      <button onClick={newUser} disabled={!added}>
        Submit Details
      </button>
      <p>
        <Link href="/login">Login</Link> if you have an account
      </p>
    </div>
  );
};

export default RegisterPage;
