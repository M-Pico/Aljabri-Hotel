"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { languages, useLanguage, type LanguageCode } from "./LanguageProvider";

const navigation = {
  ar: ["الرئيسية", "خدماتنا", "طلباتي", "تواصل معنا"],
  en: ["Home", "Services", "My orders", "Contact"],
  id: ["Beranda", "Layanan", "Pesanan saya", "Kontak"],
  tr: ["Ana sayfa", "Hizmetler", "Siparişlerim", "İletişim"],
  uz: ["Bosh sahifa", "Xizmatlar", "Buyurtmalarim", "Aloqa"],
} satisfies Record<LanguageCode, string[]>;
const menuTitles: Record<LanguageCode, string> = { ar: "القائمة الرئيسية", en: "Main menu", id: "Menu utama", tr: "Ana menü", uz: "Asosiy menyu" };
const paths = ["/", "/services", "/my-orders", "/contact"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname() ?? "/";
  const navLabels = navigation[language];

  const isCurrentPage = (path: string) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DED0] bg-white shadow-sm">
      <div className="flex items-center justify-between px-8 py-2">

        <Link href="/" className="flex items-center">
          <Image src="/logo-black.png" alt="شعار فندق الجابري" width={100} height={100} className="h-20 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 font-[Verdana] text-lg font-bold text-[#234C45] md:flex">
          {paths.map((path, index) => <Link key={path} href={path} className="transition-colors duration-200 hover:text-[#A8B9A5]">{navLabels[index]}</Link>)}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button type="button" aria-haspopup="listbox" aria-expanded={languageMenuOpen} aria-controls="language-menu" onClick={() => setLanguageMenuOpen((open) => !open)} className="flex items-center gap-2 rounded-lg border border-[#E8DED0] px-4 py-2 text-[#234C45] transition hover:bg-[#F7F4ED]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
              <span>{languages.find((item) => item.code === language)?.short}</span>
            </button>

            {languageMenuOpen && <ul id="language-menu" role="listbox" data-i18n-skip className="absolute end-0 top-full z-50 mt-2 w-44 rounded-xl border border-[#E8DED0] bg-white p-2 text-start text-[#234C45] shadow-lg">
              {languages.map((item) => <li key={item.code} role="none"><button type="button" role="option" aria-selected={language === item.code} onClick={() => { setLanguage(item.code); setLanguageMenuOpen(false); }} className={`w-full rounded-lg px-3 py-2 text-start transition hover:bg-[#F7F4ED] ${language === item.code ? "bg-[#F7F4ED] font-bold" : ""}`}>{item.label}</button></li>)}
            </ul>}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-[#234C45] transition hover:text-[#A8B9A5] md:hidden" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMenuOpen(false)} />

          <nav className="absolute inset-x-0 top-full z-50 flex w-full flex-col border-t border-[#E8DED0] bg-white px-6 py-6 text-start shadow-xl md:hidden">
            <h3 className="mb-5 text-lg font-bold text-[#234C45]">{menuTitles[language]}</h3>

            {paths.map((path, index) => {
              const active = isCurrentPage(path);
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-4 text-[#234C45] transition hover:bg-[#F7F4ED] ${active ? "bg-[#F7F4ED] font-bold" : ""}`}
                >
                  {navLabels[index]}
                </Link>
              );
            })}

            <div className="mt-5 border-t border-[#E8DED0] pt-5 text-center text-xs text-[#A8B9A5]">
              {language === "ar" ? "فندق الجابري" : "Al Jabri Hotel"}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
