import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Library Management System",
  description: "Created using Next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
