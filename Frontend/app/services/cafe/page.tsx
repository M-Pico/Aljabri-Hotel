"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage, translateMessage } from "../../components/LanguageProvider";
import { loadGuestServices, submitGuestOrder, type GuestService } from "../guest-api";

const fallbackCafeImage = "/ser3.png";
const imageByName: Record<string, string> = {
  "حلا تشوكلت": "/chocolate-dessert.png",
  "عصير أفوكادو": "/avocado-juice.png",
  "عصير كوكتيل": "/cocktail-juice.png",
  "قهوة سوداء": "/black-coffee.png",
  "كابتشينو": "/cappuccino.png",
  "كوكيز": "/cookies.png",
};
const otherCafeImages = ["https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=85"];
type CafeProduct = GuestService & { image: string; category: string };

export default function CafePage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<CafeProduct[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [room, setRoom] = useState("");
  const [delivery, setDelivery] = useState("إلى الغرفة");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("الكل");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setRoom(sessionStorage.getItem("guest_room_number") || new URLSearchParams(location.search).get("room") || "");
    loadGuestServices("الكافيه").then((rows) => setProducts(rows.map((p, i) => ({ ...p, image: imageByName[p.name] || p.image || otherCafeImages[i % otherCafeImages.length], category: /عصير|آيس|بارد|كابتشينو|قهوة سوداء/i.test(p.name) ? "مشروبات باردة" : /حلويات|كيك|كرواسون|كوكيز|حلا/i.test(p.name) ? "مأكولات" : "مشروبات ساخنة" })))).catch((e) => setError(e instanceof Error ? e.message : "تعذر تحميل الخدمات حاليًا")).finally(() => setLoading(false));
  }, []);

  const categories = ["الكل", "مشروبات ساخنة", "مشروبات باردة", "مأكولات"];
  const filteredProducts = useMemo(() => category === "الكل" ? products : products.filter(p => p.category === category), [category, products]);
  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const totalPrice = products.reduce((sum, p) => sum + Number(p.price) * (cart[p.id] || 0), 0);
  function changeQuantity(id: number, amount: number) { setCart(previous => { const updated = { ...previous }; const q = (updated[id] || 0) + amount; if (q <= 0) delete updated[id]; else updated[id] = q; return updated; }); }
  async function submitOrder() {
    if (!room) { alert(translateMessage(language, "يرجى مسح رمز QR الخاص بالغرفة")); return; }
    if (!totalItems) { alert(translateMessage(language, "يرجى إضافة منتجات إلى السلة")); return; }
    setSending(true); setError("");
    try { const items = products.filter(p => cart[p.id] > 0).map(p => ({ service_id: p.id, quantity: cart[p.id] })); const order = await submitGuestOrder(room, "الكافيه", items, [delivery, notes].filter(Boolean).join(" — ")); alert(`${translateMessage(language, "تم إرسال الطلب بنجاح")}${order.order_number ? ` · ${order.order_number}` : ""}`); setCart({}); setNotes(""); }
    catch (e) { setError(e instanceof Error ? e.message : "تعذر إرسال الطلب"); } finally { setSending(false); }
  }

  return (
    <main className="min-h-screen bg-[#F7F4ED] px-5 py-14 md:px-10 md:py-20"><div className="mx-auto max-w-7xl">
      <div className="mb-12 text-center"><span className="mb-4 inline-block text-xs font-semibold tracking-[4px] text-[#A8B9A5]">THE HOTEL CAFE</span><h1 className="mb-5 text-3xl font-bold text-[#234C45] md:text-5xl">خدمات الكافيه</h1><p className="mx-auto max-w-xl text-sm leading-8 text-[#77766F] md:text-base">استمتع بتشكيلة من المشروبات والمأكولات، واختر طلبك بكل سهولة.</p></div>
      <div className="relative mb-12 overflow-hidden rounded-[30px]"><img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600" alt="أجواء الكافيه" className="h-[280px] w-full object-cover md:h-[380px]"/><div className="absolute inset-0 bg-gradient-to-l from-[#172E29]/80 via-[#172E29]/30 to-transparent"/><div className="absolute bottom-8 end-7 text-white md:bottom-14 md:end-14"><p className="mb-3 text-xs tracking-[4px] text-white/70">A MOMENT TO ENJOY</p><h2 className="mb-3 text-3xl font-bold md:text-5xl">مذاق يرافق إقامتك</h2><p className="text-sm text-white/80">اختر طلبك واستمتع بوقتك.</p></div></div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5"><div><span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">OUR MENU</span><h3 className="mt-2 text-2xl font-bold text-[#234C45]">قائمة المنتجات</h3></div><div className="flex items-center gap-3 rounded-full border border-[#E8DED0] bg-white px-5 py-3 text-sm text-[#234C45]">سلة الطلبات <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#234C45] px-2 text-xs text-white">{totalItems}</span></div></div>
      <div className="mb-8 flex flex-wrap gap-3">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-full px-6 py-3 text-sm transition ${category===c?"bg-[#234C45] font-semibold text-white":"border border-[#E8DED0] bg-white text-[#234C45] hover:bg-[#F0F3ED]"}`}>{c}</button>)}</div>
      {loading?<p className="py-12 text-center text-[#234C45]">جارٍ تحميل قائمة الكافيه…</p>:error?<p role="alert" className="py-8 text-center text-red-700">{error}</p>:<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map(product=><div key={product.id} className="overflow-hidden rounded-[25px] border border-[#E8DED0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"><div className="relative aspect-square overflow-hidden bg-[#F7F4ED]"><img src={product.image} alt={product.name} onError={(e)=>{e.currentTarget.onerror=null;e.currentTarget.src=fallbackCafeImage}} className="h-full w-full object-contain p-3 transition duration-300"/><span className="absolute end-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#234C45]">{product.category}</span></div><div className="p-5"><div className="mb-3 flex items-center justify-between gap-3"><h4 className="font-bold text-[#234C45]">{product.name}</h4><span className="shrink-0 text-sm font-bold text-[#234C45]">{Number(product.price)} ر.س</span></div><p className="mb-5 text-xs leading-6 text-[#89877F]">{product.description}</p><div className="flex items-center justify-between"><button onClick={()=>changeQuantity(product.id,1)} className="rounded-xl bg-[#234C45] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#315E54]">+ أضف للسلة</button>{cart[product.id]>0&&<div className="flex items-center gap-3"><button onClick={()=>changeQuantity(product.id,-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8DED0] text-[#234C45]">−</button><span className="font-bold text-[#234C45]">{cart[product.id]}</span><button onClick={()=>changeQuantity(product.id,1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F3ED] text-[#234C45]">+</button></div>}</div></div></div>)}</div>}
      <section className="mx-auto mt-16 w-full max-w-2xl rounded-[30px] bg-[#234C45] p-7 text-white shadow-lg">
        <span className="text-xs font-semibold tracking-[3px] text-[#A8B9A5]">YOUR ORDER</span>
        <h3 className="mb-7 mt-3 text-2xl font-bold">ملخص الطلب</h3>
        <div className="mb-7 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm">{room ? `الغرفة ${room}` : "امسح رمز QR الخاص بغرفتك"}</div>
        <div className="mb-6 space-y-4">{products.filter(p => cart[p.id] > 0).map(p => <div key={p.id} className="flex items-center justify-between gap-3 border-b border-white/15 pb-3 text-sm"><div><p className="font-semibold text-white">{p.name}</p><p className="mt-1 text-white/70">{Number(p.price) * cart[p.id]} ر.س</p></div><div className="flex items-center gap-2"><button aria-label={`تقليل ${p.name}`} onClick={() => changeQuantity(p.id, -1)} className="rounded-full border border-white/30 px-3 py-1">−</button><span>{cart[p.id]}</span><button aria-label={`زيادة ${p.name}`} onClick={() => changeQuantity(p.id, 1)} className="rounded-full border border-white/30 px-3 py-1">+</button><button aria-label={`حذف ${p.name}`} onClick={() => changeQuantity(p.id, -cart[p.id])} className="rounded-full px-2 text-lg text-red-200 hover:bg-white/10">×</button></div></div>)}{totalItems === 0 && <p className="rounded-xl bg-white/10 p-4 text-center text-xs leading-6 text-white/70">لم تضف أي منتجات إلى طلبك بعد.</p>}</div>
        <label className="mb-2 block text-sm text-white/80">طريقة الاستلام</label><select value={delivery} onChange={e => setDelivery(e.target.value)} className="mb-6 w-full rounded-xl border border-white/20 bg-[#234C45] px-4 py-3 text-sm text-white"><option>إلى الغرفة</option><option>الاستلام من الكافيه</option></select>
        <label className="mb-2 block text-sm text-white/80">ملاحظات إضافية</label><textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="اكتب ملاحظاتك هنا..." className="mb-6 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#A8B9A5]" />
        <div className="mb-7 flex items-center justify-between border-t border-white/20 pt-5"><span className="text-sm text-white/70">الإجمالي</span><span className="text-2xl font-bold">{totalPrice} ر.س</span></div>
        {error && <p role="alert" className="mb-3 text-sm text-red-200">{error}</p>}
        <button onClick={() => void submitOrder()} disabled={sending || loading || !room || !totalItems} className="w-full rounded-xl bg-[#A8B9A5] py-4 font-bold text-[#234C45] transition hover:bg-[#DDE5D8] disabled:opacity-50">{sending ? "جارٍ إرسال الطلب…" : "إرسال الطلب"}</button>
      </section>
    </div></main>
  );
}
