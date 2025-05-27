import type { Metadata } from "next";
import Footer from "./_partials/Footer";
import Header from "./_partials/Navbar";
import "../styles.css";
import Main from "./getRefreshtoken";
import { UserProvider } from "./_utils/AuthProvider";

export const metadata: Metadata = {
  title: "Ptar* Nextjs",
  description: "Generated through practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Header />
          <div> {children}</div>
          <Footer />
          <Main />
        </body>
      </html>
    </UserProvider>
  );
}
