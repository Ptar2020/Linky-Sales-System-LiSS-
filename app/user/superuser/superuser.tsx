"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../_utils/AuthProvider";
import { showErrorMsg, showSuccessMsg } from "../../_utils/Alert";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserInterface } from "@/app/types";

const SuperuserPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserInterface[]>([]);

  const getAllUsers = async () =>
    // setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>
    {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok && data) {
          setUsers(data); // Type-safe: data.data is UserInterface[]
        } else {
          showErrorMsg("Error experienced");
        }
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setLoading(false);
      }
    };

  //   Delete a user
  const deleteUser = async (userId) => {
    const response = await fetch(`/api/user/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    getAllUsers();
    showSuccessMsg(data.success);
  };
  //   Check if user is superuser
  useEffect(() => {
    if (!user?.is_superuser || !user?.is_admin) {
      // router.push("/");
    } else {
      getAllUsers();
    }
    // if (!user?.is_superuser || !user?.is_admin) {
    //   router.push("/");
    // }
  }, [user, router]);

  return (
    <div>
      {loading && <p>Please wait...</p>}
      
      {user?.is_admin && (
        <>
          <button
            style={{ marginRight: "34px" }}
            onClick={() => history.back()}
          >
            Back
          </button>
          <Link href={`/user/superuser/business`} className="nav-link">
            Businesses
          </Link>{" "}
          {user?.is_admin && (
            <Link className="nav-link" href={`/product/new`}>
              NewProduct
            </Link>
          )}
          <Link href={`/register`}>Register</Link>
          <p>ALL USERS</p>
          <table>
            <thead>
              <th>Business</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Superuser</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {users?.map((eachUser) => (
                <tr key={eachUser?._id}>
                  {" "}
                  <td> {eachUser.business.name}</td>
                  <td>{eachUser.username}</td>
                  <td>{eachUser.email}</td>
                  <td>{eachUser.is_admin.toString()}</td>{" "}
                  <td>{eachUser.is_superuser.toString()}</td>
                  {eachUser._id === user?._id ? (
                    <>
                      <td>
                        {" "}
                        <button disabled>Edit</button>
                      </td>
                      <td>
                        <button disabled>Delete</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        {" "}
                        <button
                          onClick={() => router.push(`/user/${eachUser._id}`)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteUser(eachUser?._id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SuperuserPage;
