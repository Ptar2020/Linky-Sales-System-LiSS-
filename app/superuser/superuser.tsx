"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../_utils/AuthProvider";
import { useEffect } from "react";

const SuperuserPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Restrict access to superusers or admins
  useEffect(() => {
    if (!user || (!user.is_admin && !user.is_superuser)) {
      const timer = setTimeout(() => router.push("/login"), 1000);
      return () => clearTimeout(timer);
    }
  }, [router, user]);

  return (
    <main className="superuser">
      <section>
        <h2>This is the superuser only page</h2>
      </section>
    </main>
  );
};

export default SuperuserPage;
