
import Link from "next/link";

const orders = [
  {
    number: "#1025",
    service: "خدمات الغرف",
    details: "طلب مناشف إضافية",
    date: "05 نوفمبر 2026",
    time: "10:30 صباحًا",
    status: "قيد التنفيذ",
    statusStyle: "bg-[#F5EBD8] text-[#A47B35]",
  },
  {
    number: "#1024",
    service: "خدمات الكافيه",
    details: "طلب مشروبات",
    date: "04 نوفمبر 2026",
    time: "08:15 مساءً",
    status: "تم التنفيذ",
    statusStyle: "bg-[#E5EFE6] text-[#477451]",
  },
  {
    number: "#1023",
    service: "خدمات المغسلة",
    details: "طلب غسيل وكي",
    date: "03 نوفمبر 2026",
    time: "02:00 مساءً",
    status: "قيد الانتظار",
    statusStyle: "bg-[#F3E8E5] text-[#A35E50]",
  },
];

export default function MyOrdersPage() {
  return (
    <main className="min-h-screen bg-[#F7F4ED] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">

        {/* عنوان الصفحة */}
        <div className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#A8B9A5]" />
            <span className="text-xs tracking-[3px] text-[#A8B9A5]">
              خدماتكم وطلباتكم
            </span>
            <span className="h-px w-12 bg-[#A8B9A5]" />
          </div>

          <h1 className="mb-5 text-3xl font-bold text-[#234C45] md:text-5xl">
            طلباتي
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-[#77766F] md:text-base">
            تابعوا طلباتكم المقدمة إلى الفندق، واطلعوا على تفاصيلها
            وحالة تنفيذ كل طلب بكل سهولة.
          </p>
        </div>

        {/* إحصائيات الطلبات */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="rounded-[25px] border border-[#E8DED0] bg-white p-6">
            <p className="mb-3 text-sm text-[#77766F]">
              إجمالي الطلبات
            </p>
            <p className="text-3xl font-bold text-[#234C45]">
              03
            </p>
          </div>

          <div className="rounded-[25px] border border-[#E8DED0] bg-white p-6">
            <p className="mb-3 text-sm text-[#77766F]">
              الطلبات قيد التنفيذ
            </p>
            <p className="text-3xl font-bold text-[#A47B35]">
              01
            </p>
          </div>

          <div className="rounded-[25px] border border-[#E8DED0] bg-white p-6">
            <p className="mb-3 text-sm text-[#77766F]">
              الطلبات المكتملة
            </p>
            <p className="text-3xl font-bold text-[#477451]">
              01
            </p>
          </div>

        </div>

        {/* قائمة الطلبات */}
        <section className="rounded-[30px] border border-[#E8DED0] bg-white p-6 md:p-9">

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#234C45]">
                سجل الطلبات
              </h2>
              <p className="mt-2 text-sm text-[#99958C]">
                تفاصيل جميع الطلبات السابقة والحالية
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-3 border border-[#234C45] px-5 py-3 text-sm font-semibold text-[#234C45] transition hover:bg-[#234C45] hover:text-white"
            >
              طلب خدمة جديدة
              <span className="directional-arrow">←</span>
            </Link>
          </div>

          <div className="space-y-5">
            {orders.map((order) => (
              <article
                key={order.number}
                className="rounded-[22px] border border-[#E8DED0] p-5 transition-all duration-300 hover:border-[#A8B9A5] md:p-6"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold text-[#A8B9A5]">
                        {order.number}
                      </span>
                      <span className={`rounded-full px-4 py-1.5 text-xs font-semibold ${order.statusStyle}`}>
                        {order.status}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-[#234C45]">
                      {order.service}
                    </h3>

                    <p className="text-sm text-[#77766F]">
                      {order.details}
                    </p>
                  </div>

                  <div className="border-t border-[#E8DED0] pt-4 text-sm text-[#77766F] md:border-s md:border-t-0 md:ps-8 md:pt-0">
                    <p className="mb-2">{order.date}</p>
                    <p>{order.time}</p>
                  </div>

                </div>
              </article>
            ))}
          </div>

        </section>

        {/* قسم المساعدة */}
        <div className="mt-12 rounded-[40px] bg-[#234C45] px-6 py-10 text-center md:py-12">
          <h2 className="mb-3 text-xl font-bold text-white md:text-2xl">
            هل تحتاجون إلى المساعدة؟
          </h2>

          <p className="mb-7 text-sm leading-8 text-[#E8DED0]">
            فريقنا جاهز لمساعدتكم والإجابة عن استفساراتكم المتعلقة بالطلبات.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-4 border border-[#A8B9A5] px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#234C45]"
          >
            تواصل معنا
            <span className="directional-arrow">←</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
