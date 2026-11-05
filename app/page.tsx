
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const services = [
  {
    number: "01",
    title: "خدمات الغرف",
    description: "كل ما تحتاجونه لراحة أكبر أثناء إقامتكم.",
    image: "/ser2.png",
    href: "/services/rooms",
  },
  {
    number: "02",
    title: "خدمات المغسلة",
    description: "خدمات الغسيل والكي بعناية واهتمام.",
    image: "/ser1.png",
    href: "/services/laundry",
  },
  {
    number: "03",
    title: "خدمات الكافيه",
    description: "استمتعوا بمجموعة من المشروبات والمأكولات.",
    image: "/ser3.png",
    href: "/services/cafe",
  },
];

export default function HomePage() {
  const searchParams = useSearchParams();
  const roomNumber = searchParams.get("room");

  return (
    <main className="bg-[#F7F4ED]">

      {/* الواجهة الرئيسية */}
      <section className="relative flex min-h-[620px] items-center overflow-hidden md:min-h-[720px]">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero11.png')",
          }}
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
          <div className="max-w-2xl text-right">

            <p className="mb-6 text-xs font-medium tracking-[4px] text-[#DDE5D8] md:text-sm">
              مرحبًا بكم في فندق الجابري
            </p>

            <h1 className="mb-7 text-4xl font-bold leading-relaxed text-white md:text-6xl">
              إقامة مريحة
              <br />
              وتجربة تستحق التميز
            </h1>



            <p className="mb-10 max-w-xl text-sm leading-9 text-white/85 md:text-base">
              نحرص على توفير أجواء مريحة وخدمات متكاملة
              لتكون إقامتكم معنا تجربة مليئة بالراحة والاهتمام.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-4 bg-white px-7 py-4 text-sm font-bold text-[#234C45] transition duration-300 hover:bg-[#E8DED0]"
              >
                اكتشف خدماتنا
                <span>←</span>
              </Link>

              {roomNumber && (
                <div className="inline-flex items-center gap-3 border border-white/70 bg-white/15 px-6.5 py-2.5 text-white backdrop-blur-sm">
                  <span className="text-sm font-medium text-white/85">
                    رقم الغرفة
                  </span>

                  <span className="text-lg font-bold">
                    {roomNumber}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-8 hidden items-center gap-3 text-xs tracking-widest text-white/80 md:flex">
          <span className="h-px w-12 bg-white/70" />
          AL JABRI HOTEL
        </div>

      </section>

      {/* الخدمات المميزة */}
      <section className="bg-white px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs tracking-[3px] text-[#A8B9A5]">
                OUR SERVICES
              </p>

              <h2 className="text-3xl font-bold text-[#234C45] md:text-4xl">
                خدمات صُممت لراحتكم
              </h2>
            </div>

            <Link
              href="/services"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-[#234C45]"
            >
              جميع الخدمات
              <span className="transition-transform duration-300 group-hover:-translate-x-2">
                ←
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.number}
                href={roomNumber ? `${service.href}?room=${encodeURIComponent(roomNumber)}` : service.href}
                className="group overflow-hidden border border-[#E8DED0] bg-[#F7F4ED]"
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url("${service.image}")`,
                    }}
                  />

                  <span className="absolute bottom-4 right-5 text-sm tracking-widest text-white">
                    {service.number}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-[#234C45]">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-sm leading-8 text-[#77766F]">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#E8DED0] pt-5 text-sm font-semibold text-[#234C45]">
                    <span>اكتشف الخدمة</span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A8B9A5] transition-all duration-300 group-hover:border-[#234C45] group-hover:bg-[#234C45] group-hover:text-white">
                      ←
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* قسم متابعة الطلبات */}
      <section className="px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-[45px] bg-[#234C45] px-8 py-14 text-center md:flex-row md:px-16 md:text-right">

          <div>
            <p className="mb-4 text-xs tracking-[3px] text-[#A8B9A5]">
              YOUR ORDERS
            </p>

            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              طلباتكم في مكان واحد
            </h2>

            <p className="max-w-xl text-sm leading-8 text-[#E8DED0]">
              يمكنكم متابعة طلبات الخدمات المقدمة ومعرفة
              حالتها وتفاصيلها بكل سهولة.
            </p>
          </div>

          <Link
            href={roomNumber ? `/my-orders?room=${encodeURIComponent(roomNumber)}` : "/my-orders"}
            className="group inline-flex shrink-0 items-center gap-5 border border-[#A8B9A5] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-[#234C45]"
          >
            متابعة طلباتي

            <span className="transition-transform duration-300 group-hover:-translate-x-2">
              ←
            </span>
          </Link>

        </div>
      </section>

    </main>
  );
}
