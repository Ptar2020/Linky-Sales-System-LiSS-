import type { Metadata } from "next";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "../styles.css";

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
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
