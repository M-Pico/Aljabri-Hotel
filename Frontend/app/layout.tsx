
import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "./components/SiteLayout";

export const metadata: Metadata = {
  title: "فندق الجابري",
  description: "إقامة مريحة وخدمات فندقية في مكان واحد.",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
