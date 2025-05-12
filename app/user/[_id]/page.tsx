"use client";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { UserInterface } from "@/app/types";

const EditUser = ({ params }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [businesses, setBusinesses] = useState();
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    is_admin: false,
    is_superuser: false,
    email: "",
    is_active: true,
    gender: "",
    business: "",
  });

  const getUserData = useCallback(async () => {
    const response = await fetch(`/api/user/${params._id}`);
    const data = await response.json();
    setUserData(data);
  }, [params?._id]);

  const handleUserEdit = async () => {
    const response = await fetch(`/api/user/${params._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response?.json();
    showSuccessMsg(data.success);
    router.push("/user/superuser");
  };

  const getBusinesses = async () => {
    const response = await fetch("/api/business");
    const data = await response.json();
    setBusinesses(data);
  };
  useEffect(() => {
    getUserData();
    getBusinesses();
  }, [getUserData]);

  return (
    <div>
      {user?.is_superuser && (
        <>
          Username
          <input
            type="text"
            defaultValue={userData?.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <br />
          Email
          <input
            type="text"
            defaultValue={userData?.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <br />
          Gender{" "}
          <select
            value={userData?.gender || ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setUserData({ ...userData, gender: e.target.value })
            }
          >
            <option value={""} disabled>
              --Select gender--
            </option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Other"}>Other</option>
          </select>
          <br />
          Business{" "}
          <select
            value={userData?.business || ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setUserData({ ...userData, business: e.target.value })
            }
          >
            <option value={""} disabled>
              --Select Business--
            </option>
            {businesses?.map((business) => (
              <option key={business._id} value={business._id}>
                {business.name}
              </option>
            ))}
          </select>
          <br />
          <label>
            Active
            <input
              type="checkbox"
              checked={userData.is_active}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, is_active: e.target.checked })
              }
            />
          </label>
          <br />
          <label>
            Admin
            <input
              type="checkbox"
              checked={userData.is_admin}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, is_admin: e.target.checked })
              }
            />
          </label>
          <br />
          <label>
            Superuser
            <input
              type="checkbox"
              checked={userData.is_superuser}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, is_superuser: e.target.checked })
              }
            />
          </label>
          <br />
          <br />
          <button onClick={handleUserEdit}>Save Changes</button>
        </>
      )}
    </div>
  );
};

export default EditUser;
