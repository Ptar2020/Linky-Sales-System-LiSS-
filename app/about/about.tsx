"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../_utils/AuthProvider";
import { AboutInterface } from "../types";
import { showSuccessMsg } from "../_utils/Alert";
import swal from "sweetalert";

const AboutData = () => {
  const [about, setAbout] = useState<AboutInterface[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const loadAbout = async () => {
    const response = await fetch("/api/about");
    const data = await response.json();
    setAbout(data);
    setLoading(false);
  };

  const deleteAbout = async (_id: string) => {
    const confirmed = await swal({
      title: "Ready to delete about data?",
      icon: "warning",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    });

    if (confirmed) {
      try {
        const response = await fetch(`/api/about/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        loadAbout();
        showSuccessMsg(data.success);
      } catch (error) {
        error instanceof Error ? error.message : "Error deleting";
      }
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      <h3>ABOUT LiSS</h3>
      {user?.is_superuser && <Link href={"/about/new"}>New About</Link>}
      {loading ? (
        <div className=" flex items-center justify-center h-screen">
          <h4>Please wait...</h4>
          <p>Loading about...</p>
        </div>
      ) : (
        <>
          {about.map((about) => (
            <>
              <h4>
                {about?.title}{" "}
                {user?.is_admin && (
                  <>
                    <Link href={`/about/${about._id}`}>Edit</Link>
                    <button onClick={() => deleteAbout(about?._id)}>
                      Delete
                    </button>
                  </>
                )}
              </h4>

              <p>{about?.description}</p>
              <hr />
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default AboutData;
