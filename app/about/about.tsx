"use client";
import React, { useState, useEffect } from "react";

const AboutData = () => {
  const [about, setAbout] = useState([]);

  const loadAbout = async () => {
    const response = await fetch("/api/about");
    const data = await response.json();
    setAbout(data);
  };

  useEffect(() => {
    loadAbout();
  }, []);
    return <div>
        {about?.map((about)=>(
            <h2>{about.id} - {about.title}</h2>
            <h5>{about.description}</h5>
        ))}
    </div>;
};

export default AboutData;
