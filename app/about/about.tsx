"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../_utils/AuthProvider";
import { AboutInterface } from "../types";

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

  useEffect(() => {
    loadAbout();
  }, []);

  return (
    <div>
      <button style={{ marginRight: "34px" }} onClick={() => history.back()}>
        Back
      </button>
      {loading ? (
        <div className=" flex items-center justify-center h-screen">
          <h4>Please wait...</h4>
          <p>Loading about...</p>
        </div>
      ) : (
        <>
          <Link href="/">Back</Link>
          {about.map((about) => (
            <>
              <h2>
                {about?._id} - {about?.title}
              </h2>
              <h5>{about?.description}</h5>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default AboutData;
