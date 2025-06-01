"use client";
import { showSuccessMsg } from "@/app/_utils/Alert";
import { useAuth } from "@/app/_utils/AuthProvider";
import { AboutInterface } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

const EditAbout = ({ params }: { params: { _id: string } }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({
    title: "",
    description: "",
  });

  const getAbout = useCallback(async () => {
    const response = await fetch(`/api/about/${params?._id}`);
    console.log(response);
    const data: AboutInterface = await response.json();
    setEdit(data);
    setLoading(false);
  }, [params?._id]);

  const editAbout = async () => {
    try {
      const response = await fetch(`/api/about/${params?._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit),
      });
      const data = await response.json();
      router.push("/about");
      showSuccessMsg(data.success);
    } catch (error) {
      error instanceof Error ? error.message : "Error updating";
    }
  };

  useEffect(() => {
    getAbout();
  }, [getAbout]);

  return (
    <div>
      <button>Back</button>
      <input
        type="text"
        value={edit?.title || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEdit({ ...edit, title: e.target.value })
        }
      />
      <input
        type="text"
        value={edit?.description || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEdit({ ...edit, description: e.target.value })
        }
      />
      <button onClick={editAbout}>Save</button>
    </div>
  );
};

export default EditAbout;
