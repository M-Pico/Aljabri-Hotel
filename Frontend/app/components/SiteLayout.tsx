
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";
import Header from "./Header";
import Footer from "./footer";
import { LanguageProvider } from "./LanguageProvider";

function RoomSessionSync() {
  const roomFromUrl = useSearchParams().get("room");

  useEffect(() => {
    if (roomFromUrl && /^\d{1,30}$/.test(roomFromUrl)) {
      sessionStorage.setItem("guest_room_number", roomFromUrl);
    }
  }, [roomFromUrl]);

  return null;
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <><Suspense fallback={null}><RoomSessionSync /></Suspense>{children}</>;
  }

  return (
    <LanguageProvider>
      <Suspense fallback={null}><RoomSessionSync /></Suspense>
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
