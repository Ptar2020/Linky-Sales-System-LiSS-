"use client";
import { showSuccessMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";

const AddBusinessPage = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState();
  const [businessData, setBusinessData] = useState({
    name: "",
  });

  const addBusiness = async () => {
    const response = await fetch("/api/business", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessData),
    });
    const data = await response.json();
    getBusinesses();
    showSuccessMsg(data.success);
  };

  const getBusinesses = async () => {
    const response = await fetch("/api/business");
    const data = await response.json();
    setBusinesses(data);
  };

  const deleteBusiness = async (id) => {
    const response = await fetch(`/api/business/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    getBusinesses();
    showSuccessMsg(data.success);
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      <h3>NEW BUSINESS DETAILS</h3>
      <label>
        Business Name
        <input
          type="text"
          defaultValue={businessData?.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBusinessData({ ...businessData, name: e.target.value })
          }
          placeholder="Business Name"
        />
      </label>
      <br /> <br />
      <button onClick={addBusiness}>Save details</button>
      <hr />
      <h4>AVAILABLE BUSINESSES</h4>
      {businesses?.map((business) => (
        <p key={business?._id}>
          <Link href={"/"}>{business.name}</Link>{" "}
          {user?.business?._id !== business?._id ? (
            <button onClick={() => deleteBusiness(business._id)}>Delete</button>
          ) : (
            <button disabled>Delete</button>
          )}
          <br />
        </p>
      ))}
    </div>
  );
};

export default AddBusinessPage;
