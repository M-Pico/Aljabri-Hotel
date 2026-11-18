
"use client";

import { useState } from "react";
import { useLanguage, translateMessage } from "../../components/LanguageProvider";

const products = [
  {
    id: 1,
    name: "قهوة أمريكية",
    description: "قهوة غنية بنكهة متوازنة",
    price: 12,
    category: "مشروبات ساخنة",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",
  },
  {
    id: 2,
    name: "كابتشينو",
    description: "إسبريسو مع الحليب والرغوة",
    price: 16,
    category: "مشروبات ساخنة",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=700",
  },
  {
    id: 3,
    name: "آيس لاتيه",
    description: "قهوة باردة بالحليب",
    price: 18,
    category: "مشروبات باردة",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700",
  },
  {
    id: 4,
    name: "عصير برتقال",
    description: "عصير منعش",
    price: 14,
    category: "مشروبات باردة",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=700",
  },
  {
    id: 5,
    name: "كرواسون",
    description: "كرواسون طازج وهش",
    price: 10,
    category: "مأكولات",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700",
  },
  {
    id: 6,
    name: "كيك الشوكولاتة",
    description: "قطعة كيك غنية بالشوكولاتة",
    price: 15,
    category: "مأكولات",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
  },
];

export default function CafePage() {
  const { language } = useLanguage();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [room, setRoom] = useState("");
  const [delivery, setDelivery] = useState("إلى الغرفة");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("الكل");

  const categories = ["الكل", "مشروبات ساخنة", "مشروبات باردة", "مأكولات"];

  const filteredProducts = category === "الكل"
    ? products
    : products.filter((product) => product.category === category);

  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0
  );

  function changeQuantity(id: number, amount: number) {
    setCart((previous) => {
      const updated = { ...previous };
      const newQuantity = (updated[id] || 0) + amount;

      if (newQuantity <= 0) {
        delete updated[id];
      } else {
        updated[id] = newQuantity;
      }

      return updated;
    });
  }

  function submitOrder() {
    if (!room.trim()) {
      alert(translateMessage(language, "يرجى إدخال رقم الغرفة"));
      return;
    }

    if (totalItems === 0) {
      alert(translateMessage(language, "يرجى إضافة منتجات إلى السلة"));
      return;
    }

    const order = {
      type: "خدمات الكافيه",
      room,
      delivery,
      items: products
        .filter((product) => cart[product.id] > 0)
        .map((product) => ({
          name: product.name,
          price: product.price,
          quantity: cart[product.id],
        })),
      totalPrice,
      notes,
      date: new Date().toLocaleString("ar-SA"),
    };

    const previous = JSON.parse(localStorage.getItem("hotelRequests") || "[]");
    localStorage.setItem("hotelRequests", JSON.stringify([...previous, order]));

    alert(translateMessage(language, "تم حفظ طلب الكافيه تجريبيًا بنجاح"));
    setCart({});
    setNotes("");
  }

  return (
    <main className="min-h-screen bg-[#F7F4ED] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[4px] text-[#A8B9A5]">
            THE HOTEL CAFE
          </span>
          <h1 className="mb-5 text-3xl font-bold text-[#234C45] md:text-5xl">
            خدمات الكافيه
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-8 text-[#77766F] md:text-base">
            استمتع بتشكيلة من المشروبات والمأكولات، واختر طلبك بكل سهولة.
          </p>
        </div>

        <div className="relative mb-12 overflow-hidden rounded-[30px]">
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600"
            alt="أجواء الكافيه"
            className="h-[280px] w-full object-cover md:h-[380px]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#172E29]/80 via-[#172E29]/30 to-transparent" />
          <div className="absolute bottom-8 end-7 text-white md:bottom-14 md:end-14">
            <p className="mb-3 text-xs tracking-[4px] text-white/70">A MOMENT TO ENJOY</p>
            <h2 className="mb-3 text-3xl font-bold md:text-5xl">
              مذاق يرافق إقامتك
            </h2>
            <p className="text-sm text-white/80">اختر طلبك واستمتع بوقتك.</p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">
              OUR MENU
            </span>
            <h3 className="mt-2 text-2xl font-bold text-[#234C45]">
              قائمة المنتجات
            </h3>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[#E8DED0] bg-white px-5 py-3 text-sm text-[#234C45]">
            <span>سلة الطلبات</span>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#234C45] px-2 text-xs text-white">
              {totalItems}
            </span>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-6 py-3 text-sm transition ${
                category === item
                  ? "bg-[#234C45] font-semibold text-white"
                  : "border border-[#E8DED0] bg-white text-[#234C45] hover:bg-[#F0F3ED]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-[25px] border border-[#E8DED0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute end-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#234C45]">
                  {product.category}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h4 className="font-bold text-[#234C45]">{product.name}</h4>
                  <span className="shrink-0 text-sm font-bold text-[#234C45]">
                    {product.price} ر.س
                  </span>
                </div>

                <p className="mb-5 text-xs leading-6 text-[#89877F]">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeQuantity(product.id, 1)}
                    className="rounded-xl bg-[#234C45] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#315E54]"
                  >
                    + أضف للسلة
                  </button>

                  {cart[product.id] > 0 && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => changeQuantity(product.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8DED0] text-[#234C45]"
                      >
                        −
                      </button>
                      <span className="font-bold text-[#234C45]">
                        {cart[product.id]}
                      </span>
                      <button
                        onClick={() => changeQuantity(product.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F3ED] text-[#234C45]"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[30px] bg-white p-7 shadow-sm md:p-9">
            <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">
              DELIVERY DETAILS
            </span>
            <h3 className="mb-7 mt-3 text-2xl font-bold text-[#234C45]">
              بيانات استلام الطلب
            </h3>

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
              طريقة استلام الطلب
            </label>
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="mb-6 w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm text-[#234C45] outline-none focus:border-[#234C45]"
            >
              <option>إلى الغرفة</option>
              <option>الاستلام من الكافيه</option>
            </select>

            <label className="mb-2 block text-sm font-semibold text-[#234C45]">
              ملاحظات إضافية
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="أي تفاصيل خاصة بطلبك؟"
              className="w-full resize-none rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm outline-none focus:border-[#234C45]"
            />
          </div>

          <div className="h-fit rounded-[30px] bg-[#234C45] p-7 text-white shadow-lg lg:sticky lg:top-28">
            <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">
              YOUR ORDER
            </span>
            <h3 className="mb-7 mt-3 text-2xl font-bold">سلة الطلبات</h3>

            {totalItems === 0 ? (
              <p className="rounded-xl bg-white/10 p-5 text-center text-sm leading-7 text-white/70">
                لم تضف أي منتجات إلى سلتك بعد.
              </p>
            ) : (
              <div className="mb-6 space-y-5">
                {products.filter((product) => cart[product.id] > 0).map((product) => (
                  <div key={product.id} className="border-b border-white/15 pb-4">
                    <div className="mb-3 flex justify-between gap-3 text-sm">
                      <span className="font-semibold">{product.name}</span>
                      <span className="shrink-0">
                        {product.price * cart[product.id]} ر.س
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span>{product.price} ر.س × {cart[product.id]}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => changeQuantity(product.id, -1)}
                          className="rounded-full border border-white/30 px-3 py-1"
                        >
                          −
                        </button>
                        <span>{cart[product.id]}</span>
                        <button
                          onClick={() => changeQuantity(product.id, 1)}
                          className="rounded-full border border-white/30 px-3 py-1"
                        >
                          +
                        </button>
                        <button
                          onClick={() => changeQuantity(product.id, -cart[product.id])}
                          className="text-red-200"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-7 flex items-center justify-between border-t border-white/20 pt-6">
              <span className="text-sm text-white/70">إجمالي الطلب</span>
              <span className="text-2xl font-bold">{totalPrice} ر.س</span>
            </div>

            <button
              onClick={submitOrder}
              className="w-full rounded-xl bg-[#A8B9A5] py-4 font-bold text-[#234C45] transition hover:bg-[#DDE5D8]"
            >
              إرسال الطلب
            </button>

            <p className="mt-5 text-center text-xs leading-6 text-white/60">
              سيتم إرسال الطلب إلى الإدارة بعد ربط النظام.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
