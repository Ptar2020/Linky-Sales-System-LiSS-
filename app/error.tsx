"use client";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <p>Error message</p>
      <p>{error.message || "An unexpected error occurred"}</p>
      <button onClick={reset}>Restry</button>
    </div>
  );
};

export default Error;
