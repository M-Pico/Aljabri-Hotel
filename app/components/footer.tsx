
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#234C45] text-white">

            <div className="grid grid-cols-1 gap-10 px-8 py-12 md:grid-cols-3">

                {/* شعار الفندق */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <Image
                        src="/logo22.png"
                        alt="شعار فندق الجابري"
                        width={100}
                        height={100}
                        className="h-20 w-auto object-contain brightness-0 invert"
                    />

                    <h3 className="text-xl font-bold tracking-wide text-white">
                        فندق الجابري
                    </h3>

                    <div className="h-0.5  w-12 rounded-full bg-[#A8B9A5]" />

                    <p className="max-w-xs text-sm leading-8 text-[#E8DED0]">
                        نسعى لتوفير تجربة إقامة مريحة ومميزة لضيوفنا.
                    </p>
                </div>

                {/* روابط الصفحات */}
                <div className="flex flex-col items-center text-center">
                    <h3 className="mb-5 text-lg font-bold">روابط سريعة</h3>

                    <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#E8DED0]">
                        <li>
                            <Link href="/" className="transition hover:text-[#A8B9A5]">    الرئيسة</Link>
                        </li>

                        <li>
                            <Link href="/services" className="transition hover:text-[#A8B9A5]">   خدماتنا</Link>
                        </li>

                        <li>
                            <Link href="/my-orders" className="transition hover:text-[#A8B9A5]">    طلباتي</Link>
                        </li>

                        <li>
                            <Link href="/contact" className="transition hover:text-[#A8B9A5]">    تواصل معنا</Link>
                        </li>
                    </ul>
                </div>

                {/* التواصل ومواقع التواصل */}
                <div className="flex flex-col items-center text-center">
                    <h3 className="mb-5 text-lg font-bold">تواصل معنا</h3>

                    <div className="flex flex-col items-center gap-4 text-sm text-[#E8DED0]">

                        <a href="tel:+966XXXXXXXXX" className="transition hover:text-[#A8B9A5]">
                            رقم الهاتف: +966 XX XXX XXXX
                        </a>

                        <a
                            href="https://maps.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-[#A8B9A5]"
                        >
                            موقع الفندق على Google Maps
                        </a>

                        <div className="mt-2 flex items-center justify-center gap-5">
                            <a href="#" aria-label="TikTok" className="transition hover:text-[#A8B9A5]">TikTok</a>
                            <a href="#" aria-label="WhatsApp" className="transition hover:text-[#A8B9A5]">WhatsApp</a>
                            <a href="#" aria-label="Instagram" className="transition hover:text-[#A8B9A5]">Instagram</a>
                        </div>

                    </div>
                </div>

            </div>

            {/* حقوق النشر */}
            <div className="border-t border-[#A8B9A5]/30 px-8 py-5 text-center text-sm text-[#E8DED0]">
                © {new Date().getFullYear()} فندق الجابري. جميع الحقوق محفوظة.
            </div>

        </footer>
    );
}
