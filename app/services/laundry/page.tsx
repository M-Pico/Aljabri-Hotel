
"use client";

import { useState } from "react";

const laundryServices = [
  { id: 1, name: "غسيل قطعة ملابس", description: "غسيل وتنظيف الملابس", price: 8 },
  { id: 2, name: "كي قطعة ملابس", description: "كي وتجهيز الملابس", price: 6 },
  { id: 3, name: "غسيل وكي قطعة", description: "غسيل وكي معًا", price: 12 },
  { id: 4, name: "غسيل ثوب", description: "تنظيف وعناية بالثوب", price: 10 },
  { id: 5, name: "كي ثوب", description: "كي الثوب وتجهيزه", price: 7 },
];

export default function LaundryPage() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [room, setRoom] = useState("");
  const [notes, setNotes] = useState("");

  const totalItems = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);

  const totalPrice = laundryServices.reduce(
    (sum, service) => sum + service.price * (quantities[service.id] || 0),
    0
  );

  function updateQuantity(id: number, amount: number) {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + amount),
    }));
  }

  function submitRequest() {
    if (!room.trim()) {
      alert("يرجى إدخال رقم الغرفة");
      return;
    }

    if (totalItems === 0) {
      alert("يرجى اختيار خدمة واحدة على الأقل");
      return;
    }

    const request = {
      type: "خدمات المغسلة",
      room,
      items: laundryServices
        .filter((service) => quantities[service.id] > 0)
        .map((service) => ({
          name: service.name,
          price: service.price,
          quantity: quantities[service.id],
        })),
      totalPrice,
      notes,
      date: new Date().toLocaleString("ar-SA"),
    };

    const previous = JSON.parse(localStorage.getItem("hotelRequests") || "[]");
    localStorage.setItem("hotelRequests", JSON.stringify([...previous, request]));

    alert("تم حفظ طلب المغسلة تجريبيًا بنجاح");
    setQuantities({});
    setNotes("");
  }

  return (
    <main className="min-h-screen bg-[#F7F4ED] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[4px] text-[#A8B9A5]">
            LAUNDRY SERVICE
          </span>
          <h1 className="mb-5 text-3xl font-bold text-[#234C45] md:text-5xl">
            خدمات المغسلة
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-8 text-[#77766F] md:text-base">
            نعتني بملابسك ونحافظ على أناقتك من خلال خدمات الغسيل والكي بعناية.
          </p>
        </div>

        <div className="mb-10 grid overflow-hidden rounded-[30px] bg-white shadow-[0_15px_50px_rgba(35,76,69,0.07)] md:grid-cols-2">
          <div className="relative min-h-[260px]">
            <img
              src="/ser1.png"
              alt="خدمات المغسلة"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172E29]/80 to-transparent" />
            <div className="absolute bottom-8 right-8 text-white">
              <p className="mb-3 text-xs tracking-[3px] text-white/70">CARE & ELEGANCE</p>
              <h2 className="text-3xl font-bold">أناقتك تستحق العناية</h2>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">
              OUR LAUNDRY
            </span>
            <h3 className="mb-4 mt-3 text-2xl font-bold text-[#234C45]">
              اختر خدماتك بكل سهولة
            </h3>
            <p className="text-sm leading-8 text-[#89877F]">
              تصفح الخدمات المتاحة، وحدد الكميات التي تحتاجها، وسيتم احتساب إجمالي طلبك تلقائيًا.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">
                SERVICE MENU
              </span>
              <h3 className="mt-2 text-2xl font-bold text-[#234C45]">
                قائمة خدمات الغسيل والكي
              </h3>
            </div>

            <div className="space-y-4">
              {laundryServices.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#E8DED0] bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0F3ED] text-2xl text-[#A8B9A5]">
                      ✧
                    </div>
                    <div>
                      <h4 className="mb-2 font-bold text-[#234C45]">
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#89877F]">
                        {service.description}
                      </p>
                      <p className="mt-2 text-sm font-bold text-[#234C45]">
                        {service.price} ر.س
                        <span className="mr-1 text-xs font-normal text-[#89877F]">/ للقطعة</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(service.id, -1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DED0] text-lg text-[#234C45] transition hover:bg-[#F7F4ED]"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center font-bold text-[#234C45]">
                      {quantities[service.id] || 0}
                    </span>
                    <button
                      onClick={() => updateQuantity(service.id, 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#234C45] text-lg text-white transition hover:bg-[#315E54]"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-[30px] bg-[#234C45] p-7 text-white shadow-lg lg:sticky lg:top-28">
            <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">
              YOUR ORDER
            </span>
            <h3 className="mb-7 mt-3 text-2xl font-bold">ملخص الطلب</h3>

            <label className="mb-2 block text-sm text-white/80">
              رقم الغرفة
            </label>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="رقم الغرفة"
              className="mb-7 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#A8B9A5]"
            />

            <div className="mb-6 space-y-4">
              {laundryServices.filter((service) => quantities[service.id] > 0).map((service) => (
                <div key={service.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-white/80">
                    {service.name} × {quantities[service.id]}
                  </span>
                  <span className="shrink-0 font-semibold">
                    {service.price * quantities[service.id]} ر.س
                  </span>
                </div>
              ))}

              {totalItems === 0 && (
                <p className="rounded-xl bg-white/10 p-4 text-center text-xs leading-6 text-white/70">
                  لم تختر أي خدمة بعد.
                </p>
              )}
            </div>

            <div className="mb-6 border-t border-white/20 pt-5">
              <label className="mb-2 block text-sm text-white/80">
                ملاحظات إضافية
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="اكتب ملاحظاتك هنا..."
                className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#A8B9A5]"
              />
            </div>

            <div className="mb-7 flex items-center justify-between border-t border-white/20 pt-5">
              <span className="text-sm text-white/70">الإجمالي</span>
              <span className="text-2xl font-bold">{totalPrice} ر.س</span>
            </div>

            <button
              onClick={submitRequest}
              className="w-full rounded-xl bg-[#A8B9A5] py-4 font-bold text-[#234C45] transition hover:bg-[#DDE5D8]"
            >
              إرسال طلب المغسلة
            </button>
            <p className="mt-4 text-center text-xs leading-6 text-white/60">
              الأسعار الموضحة تجريبية وقابلة للتعديل.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
