import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
