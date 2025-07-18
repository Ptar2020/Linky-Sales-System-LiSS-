"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/AuthProvider";
import { showErrorMsg, showSuccessMsg } from "@/app/_utils/Alert";
import { UserInterface, BusinessInterface } from "@/app/types";
import { useState, useEffect } from "react";

const SuperuserPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data: UserInterface[] = await response.json();
        setUsers(data);
      } else {
        showErrorMsg("Failed to fetch users");
      }
    } catch (error) {
      showErrorMsg(error instanceof Error ? error.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Delete a user with confirmation
  const deleteUser = async (userId: string) => {
    if (!confirm(`Are you sure you want to delete user ${userId}?`)) return;
    setDeletingId(userId);
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        showSuccessMsg(data.success || "User deleted successfully");
        await getAllUsers();
      } else {
        showErrorMsg(data.msg || "Failed to delete user");
      }
    } catch (error) {
      showErrorMsg(error instanceof Error ? error.message : "Network error");
    } finally {
      setDeletingId(null);
    }
  };

  // Restrict access to superusers or admins
  useEffect(() => {
    if (!user || (!user.is_admin && !user.is_superuser)) {
      showErrorMsg("Restricted operation. Contact admin.");
      const timer = setTimeout(() => router.push("/login"), 1000);
      return () => clearTimeout(timer);
    }
    getAllUsers();
  }, [router, user]);

  return (
    <main className="superuser">
      <section>
        <div className="overflow-x-auto ">
          <table className="w-full border-collapse bg-white rounded-lg">
            <caption className="sr-only">Registered users</caption>
            <thead className="bg-teal/10">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium text-charcoal"
                >
                  Business
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium text-charcoal"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium text-charcoal"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium text-charcoal"
                >
                  Admin
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium text-charcoal"
                >
                  Superuser
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-medium text-charcoal"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((eachUser) => (
                <tr key={eachUser?._id} className="border-t hover:bg-teal/5">
                  <td className="px-4 py-3 text-sm text-charcoal">
                    {typeof eachUser?.business === "string"
                      ? eachUser.business
                      : eachUser?.business?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal">
                    {eachUser?.username}
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal">
                    {eachUser?.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal">
                    {eachUser?.is_admin ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal">
                    {eachUser?.is_superuser ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {eachUser?._id === user?._id ? (
                      <div className="flex gap-2">
                        <button disabled>Edit</button>
                        <button disabled>Delete</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/user/${eachUser?._id}`)}
                          disabled={deletingId === eachUser?._id}
                        >
                          Edit
                        </button>
                        {eachUser?._id && (
                          <button
                            onClick={() => deleteUser(eachUser?._id)}
                            disabled={deletingId === eachUser?._id}
                          >
                            {deletingId === eachUser?._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default SuperuserPage;
