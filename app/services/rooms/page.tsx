
"use client";

import { useState } from "react";
import { useLanguage, translateMessage } from "../../components/LanguageProvider";

const services = [
  { id: "cleaning", title: "طلب تنظيف الغرفة", description: "تنظيف وترتيب الغرفة", icon: "✦" },
  { id: "towels", title: "طلب مناشف", description: "توفير مناشف إضافية", icon: "♧" },
  { id: "supplies", title: "طلب مستلزمات", description: "توفير مستلزمات واحتياجات الغرفة", icon: "◇" },
];

export default function RoomsPage() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState("cleaning");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [room, setRoom] = useState("");
  const [notes, setNotes] = useState("");

  function submitRequest() {
    if (!room.trim()) {
      alert(translateMessage(language, "يرجى إدخال رقم الغرفة"));
      return;
    }

    if (!details.trim()) {
      alert(translateMessage(language, "يرجى تحديد تفاصيل الطلب"));
      return;
    }

    const service = services.find((item) => item.id === selected);

    const request = {
      type: "خدمات الغرف",
      service: service?.title,
      details,
      quantity,
      room,
      notes,
      date: new Date().toLocaleString("ar-SA"),
    };

    const previous = JSON.parse(localStorage.getItem("hotelRequests") || "[]");
    localStorage.setItem("hotelRequests", JSON.stringify([...previous, request]));

    alert(translateMessage(language, "تم حفظ طلبك تجريبيًا بنجاح"));
    setDetails("");
    setQuantity("1");
    setNotes("");
  }

  return (
    <main className="min-h-screen bg-[#F7F4ED] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[4px] text-[#A8B9A5]">
            ROOM SERVICES
          </span>
          <h1 className="mb-5 text-3xl font-bold text-[#234C45] md:text-5xl">
            خدمات الغرف
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-8 text-[#77766F] md:text-base">
            راحتكم أولويتنا، اختر الخدمة التي تحتاجها وسنهتم بتوفيرها لكم بكل عناية.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_15px_50px_rgba(35,76,69,0.07)]">
            <div className="relative h-64 md:h-80">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200"
                alt="غرفة فندقية"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172E29]/70 to-transparent" />
              <div className="absolute bottom-7 end-7 text-white">
                <p className="mb-2 text-xs tracking-[3px] text-white/70">YOUR COMFORT</p>
                <h2 className="text-2xl font-bold md:text-3xl">راحتكم في أدق التفاصيل</h2>
              </div>
            </div>

            <div className="p-6 md:p-9">
              <h3 className="mb-6 text-xl font-bold text-[#234C45]">
                اختر نوع الطلب
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelected(service.id);
                      setDetails("");
                    }}
                    className={`rounded-2xl border p-5 text-start transition ${
                      selected === service.id
                        ? "border-[#234C45] bg-[#F0F3ED]"
                        : "border-[#E8DED0] hover:border-[#A8B9A5]"
                    }`}
                  >
                    <span className="mb-4 block text-3xl text-[#A8B9A5]">
                      {service.icon}
                    </span>
                    <span className="mb-2 block text-sm font-bold text-[#234C45]">
                      {service.title}
                    </span>
                    <span className="block text-xs leading-6 text-[#89877F]">
                      {service.description}
                    </span>
                    <span className={`mt-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected === service.id
                        ? "border-[#234C45] bg-[#234C45] text-white"
                        : "border-[#D8D3C8]"
                    }`}>
                      {selected === service.id && "✓"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-fit rounded-[30px] bg-white p-7 shadow-[0_15px_50px_rgba(35,76,69,0.07)] md:p-9">
            <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">
              REQUEST DETAILS
            </span>
            <h3 className="mb-3 mt-3 text-2xl font-bold text-[#234C45]">
              تفاصيل الطلب
            </h3>
            <p className="mb-8 text-sm leading-7 text-[#89877F]">
              أدخل بيانات الطلب حتى نتمكن من خدمتك.
            </p>

            <label className="mb-2 block text-sm font-semibold text-[#234C45]">
              رقم الغرفة
            </label>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="أدخل رقم الغرفة"
              className="mb-6 w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm outline-none focus:border-[#234C45]"
            />

            <label className="mb-2 block text-sm font-semibold text-[#234C45]">
              تفاصيل نوع الطلب
            </label>
            <select
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mb-6 w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm text-[#234C45] outline-none focus:border-[#234C45]"
            >
              <option value="">اختر التفاصيل</option>
              {selected === "cleaning" && (
                <>
                  <option>تنظيف الغرفة بالكامل</option>
                  <option>ترتيب الغرفة</option>
                  <option>تنظيف الحمام</option>
                </>
              )}
              {selected === "towels" && (
                <>
                  <option>مناشف استحمام</option>
                  <option>مناشف يد</option>
                  <option>مناشف إضافية</option>
                </>
              )}
              {selected === "supplies" && (
                <>
                  <option>مستلزمات الحمام</option>
                  <option>مياه إضافية</option>
                  <option>مستلزمات شخصية</option>
                  <option>مخدات إضافية</option>
                </>
              )}
            </select>

            <label className="mb-2 block text-sm font-semibold text-[#234C45]">
              الكمية
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mb-6 w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm outline-none focus:border-[#234C45]"
            />

            <label className="mb-2 block text-sm font-semibold text-[#234C45]">
              ملاحظات إضافية
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="اكتب أي تفاصيل إضافية..."
              className="mb-7 w-full resize-none rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm outline-none focus:border-[#234C45]"
            />

            <button
              onClick={submitRequest}
              className="w-full rounded-xl bg-[#234C45] py-4 font-semibold text-white transition hover:bg-[#315E54]"
            >
              إرسال طلب الخدمة
            </button>
            <p className="mt-5 text-center text-xs text-[#A19D92]">
              نسعد بخدمتكم ونتمنى لكم إقامة مريحة
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
