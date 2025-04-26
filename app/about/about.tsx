"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';

const AboutData = () => {
    const [about, setAbout] = useState();
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
      {loading ? <div className=" flex items-center justify-center h-screen" >
      <h4>Please wait...</h4>
      <p>Loading about...</p>
      </div> 
      : <>
      <Link href="/" >Back</Link>
      {about?.map((about) => (
        <>
          <h2>
            {about.id} - {about.title}
          </h2>
          <h5>{about.description}</h5>
        </>
      ))}</>}
    </div>
  );
};

export default AboutData;
