
"use client";

import { useState } from "react";

export default function WifiPage() {
  const [copied, setCopied] = useState(false);

  const wifiName = "Aljabri_Hotel";
  const wifiPassword = "12345678";

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(wifiPassword);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      alert("تعذر نسخ كلمة المرور. يرجى نسخها يدويًا.");
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F4ED] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[4px] text-[#A8B9A5]">
            STAY CONNECTED
          </span>
          <h1 className="mb-5 text-3xl font-bold text-[#234C45] md:text-5xl">
            خدمة الواي فاي
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-8 text-[#77766F] md:text-base">
            استمتع باتصال إنترنت مريح طوال فترة إقامتك، وابقَ على تواصل مع من تحب.
          </p>
        </div>

        <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_15px_50px_rgba(35,76,69,0.08)] md:grid md:grid-cols-2">
          <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden bg-[#234C45] px-8 py-12 text-center text-white">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />

            <div className="relative mb-7 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="h-14 w-14"
              >
                <path d="M2 8.8a15.5 15.5 0 0 1 20 0" />
                <path d="M5 12a11 11 0 0 1 14 0" />
                <path d="M8.5 15.5a5.5 5.5 0 0 1 7 0" />
                <circle cx="12" cy="19" r="1" fill="currentColor" />
              </svg>
            </div>

            <h2 className="relative mb-3 text-2xl font-bold">
              اتصالك بالعالم
            </h2>
            <p className="relative max-w-xs text-sm leading-7 text-white/70">
              إنترنت متاح لراحتك، سواء للعمل أو الترفيه أو التواصل.
            </p>
          </div>

          <div className="px-6 py-10 md:px-10 md:py-12">
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold tracking-wider text-[#A8B9A5]">
                NETWORK DETAILS
              </p>
              <h3 className="text-xl font-bold text-[#234C45]">
                بيانات شبكة الفندق
              </h3>
            </div>

            <div className="mb-5 rounded-2xl border border-[#E8DED0] bg-[#F7F4ED] p-5">
              <p className="mb-2 text-xs text-[#89877F]">اسم الشبكة</p>
              <div className="flex items-center justify-between gap-3">
                <span dir="ltr" className="font-semibold text-[#234C45]">
                  {wifiName}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-[#234C45]">
                  Wi-Fi
                </span>
              </div>
            </div>

            <div className="mb-7 rounded-2xl border border-[#E8DED0] bg-[#F7F4ED] p-5">
              <p className="mb-2 text-xs text-[#89877F]">كلمة المرور</p>
              <div className="flex items-center justify-between gap-3">
                <span dir="ltr" className="font-semibold tracking-wider text-[#234C45]">
                  {wifiPassword}
                </span>
                <button
                  onClick={copyPassword}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    copied
                      ? "bg-[#A8B9A5] text-[#234C45]"
                      : "bg-[#234C45] text-white hover:bg-[#315E54]"
                  }`}
                >
                  {copied ? "✓ تم النسخ" : "نسخ كلمة المرور"}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E8DED0] px-5 py-5">
              <h4 className="mb-4 font-bold text-[#234C45]">
                طريقة الاتصال
              </h4>
              <ol className="space-y-3 text-sm leading-7 text-[#77766F]">
                <li>١. افتح إعدادات Wi-Fi في جهازك.</li>
                <li>٢. اختر اسم شبكة الفندق.</li>
                <li>٣. انسخ كلمة المرور والصقها للاتصال.</li>
              </ol>
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-[#A19D92]">
              لأي استفسار أو مساعدة، يسعد فريق الاستقبال بخدمتكم.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
