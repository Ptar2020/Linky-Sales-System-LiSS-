"use client";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const About = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [about, setAbout] = useState({
    title: "",
    description: "",
  });

  const newAbout = async () => {
    const response = await fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    });
    const data = await response.json();
    showSuccessMsg(data.success);
  };

  useEffect(() => {
    if (!user?.is_superuser) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className={"about"}>
      <p>Title</p>
      <input
        value={about.title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAbout({ ...about, title: e.target.value })
        }
        type="text"
      />
      <p>Description</p>
      <textarea
        value={about.description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setAbout({ ...about, description: e.target.value })
        }
      ></textarea>
      <hr />
      <button onClick={() => newAbout()}>Submit</button>
    </div>
  );
};

export default About;
