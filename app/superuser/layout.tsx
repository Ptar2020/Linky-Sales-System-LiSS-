import type { Metadata } from "next";
// import "../styles.css";
import SuperuserHeader from "../_partials/SuperuserHeader";

export const metadata: Metadata = {
  title: "Ptar* Nextjs",
  description: "Generated through practice",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SuperuserHeader />
      <hr />
      {children}
    </div>
  );
}
