"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DED0] bg-white shadow-sm">
      <div className="flex items-center justify-between px-8 py-2">

        <Link href="/" className="flex items-center">
          <Image src="/logo-black.png" alt="شعار فندق الجابري" width={100} height={100} className="h-20 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 font-[Verdana] text-lg font-bold text-[#234C45] md:flex">
          <Link href="/" className="transition-colors duration-200 hover:text-[#A8B9A5]">الرئيسية</Link>
          <Link href="/services" className="transition-colors duration-200 hover:text-[#A8B9A5]">خدماتنا</Link>
          <Link href="/my-orders" className="transition-colors duration-200 hover:text-[#A8B9A5]">طلباتي</Link>
          <Link href="/contact" className="transition-colors duration-200 hover:text-[#A8B9A5]">تواصل معنا</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="flex items-center gap-2 rounded-lg border border-[#E8DED0] px-4 py-2 text-[#234C45] transition hover:bg-[#F7F4ED]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
              <span>AR</span>
            </button>

            <ul tabIndex={0} className="dropdown-content menu z-50 mt-2 w-44 rounded-xl border border-[#E8DED0] bg-white p-2 text-right text-[#234C45] shadow-lg">
              <li><button className="bg-[#F7F4ED] font-bold">العربية</button></li>
              <li><button>English</button></li>
              <li><button>Français</button></li>
              <li><button>Indonesia</button></li>
              <li><button>Türkçe</button></li>
              <li><button>O‘zbekcha</button></li>
            </ul>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-[#234C45] transition hover:text-[#A8B9A5] md:hidden" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMenuOpen(false)} />

          <nav className="absolute right-0 top-full z-50 flex w-full flex-col border-t border-[#E8DED0] bg-white px-6 py-6 shadow-xl md:hidden">
            <h3 className="mb-5 text-right text-lg font-bold text-[#234C45]">القائمة الرئيسية</h3>

            <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-xl bg-[#F7F4ED] px-4 py-4 text-right font-bold text-[#234C45] transition hover:bg-[#E8DED0]">الرئيسية</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-4 text-right text-[#234C45] transition hover:bg-[#F7F4ED]">خدماتنا</Link>
            <Link href="/my-orders" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-4 text-right text-[#234C45] transition hover:bg-[#F7F4ED]">طلباتي</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-4 text-right text-[#234C45] transition hover:bg-[#F7F4ED]">تواصل معنا</Link>

            <div className="mt-5 border-t border-[#E8DED0] pt-5 text-center text-xs text-[#A8B9A5]">
              فندق الجابري
            </div>
          </nav>
        </>
      )}
    </header>
  );
}