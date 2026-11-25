
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";
import { LanguageProvider } from "./LanguageProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roomFromUrl = searchParams.get("room");
  useEffect(() => {
    if (roomFromUrl && /^\d{1,30}$/.test(roomFromUrl)) sessionStorage.setItem("guest_room_number", roomFromUrl);
  }, [roomFromUrl]);
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
