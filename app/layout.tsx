import type { Metadata } from "next";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
          {children}
          <Footer />
          <Main />
        </body>
      </html>
    </UserProvider>
  );
}
