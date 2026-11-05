
import Link from "next/link";

const services = [
    {
        number: "01",
        title: "خدمات الغرف",
        description: "نحرص على راحتكم من خلال خدمات التنظيف وتوفير المناشف والمستلزمات التي تحتاجونها.",
        image: "ser2.png",
        href: "/services/rooms",
    },
    {
        number: "02",
        title: "خدمات المغسلة",
        description: "اعتنِ بأناقتك مع خدمات الغسيل والكي، واختر الخدمة والكمية المناسبة لك.",
        image: "ser1.png",
        href: "/services/laundry",
    },
    {
        number: "03",
        title: "خدمات الكافيه",
        description: "استمتع بتجربة مميزة، وتصفح قائمة المشروبات والمأكولات المتوفرة لدينا.",
        image: "ser3.png",
        href: "/services/cafe",
    },
    {
        number: "04",
        title: "خدمات الواي فاي",
        description: "ابقَ على اتصال طوال إقامتك من خلال شبكة الإنترنت الخاصة بالفندق.",
        image: "ser4.png",
        href: "/services/wifi",
    },
    {
        number: "05",
        title: "تقييم الإقامة",
        description: "تجربتكم تعني لنا الكثير، شاركونا آراءكم وملاحظاتكم لتطوير خدماتنا.",
        image: "ser5.png",
        href: "https://www.google.com/maps",
    },
    {
        number: "06",
        title: "التواصل مع الاستقبال",
        description: "فريق الاستقبال متاح لمساعدتكم والإجابة عن استفساراتكم بكل اهتمام.",
        image: "ser6.png",
        href: "/contact",
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#F7F4ED] px-5 py-16 md:px-10 md:py-20">
            <div className="mx-auto max-w-7xl">

                {/* عنوان الصفحة */}
                <div className="mb-16 text-center md:mb-20">
                    <div className="mx-auto mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-12 bg-[#A8B9A5]" />
                        <span className="text-xs font-medium tracking-[3px] text-[#A8B9A5]">
                            تجربة إقامة متكاملة
                        </span>
                        <span className="h-px w-12 bg-[#A8B9A5]" />
                    </div>

                    <h1 className="mb-5 text-4xl font-bold tracking-wide text-[#234C45] md:text-5xl">
                        خدماتنا
                    </h1>

                    <p className="mx-auto max-w-2xl text-sm leading-8 text-[#77766F] md:text-base">
                        نهتم بأدق التفاصيل لنمنحكم إقامة أكثر راحة ورفاهية،
                        مع مجموعة من الخدمات المصممة لتلبية احتياجاتكم بكل عناية.
                    </p>
                </div>

                {/* بطاقات الخدمات */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
                    {services.map((service) => (
                        <article
                            key={service.number}
                            className="group overflow-hidden border border-[#E8DED0] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* صورة الخدمة */}
                            <div className="relative h-64 overflow-hidden md:h-72">
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url("${service.image}")` }}
                                    role="img"
                                    aria-label={service.title}
                                />
                                <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15" />
                                <span className="absolute bottom-5 right-5 text-sm font-medium tracking-widest text-white">
                                    {service.number} / 06
                                </span>
                            </div>

                            {/* تفاصيل الخدمة */}
                            <div className="p-6 md:p-7">
                                <h2 className="mb-3 text-xl font-bold text-[#234C45]">
                                    {service.title}
                                </h2>

                                <p className="min-h-16 text-sm leading-8 text-[#77766F]">
                                    {service.description}
                                </p>

                                {/* زر اكتشاف الخدمة */}
                                <div className="mt-6 border-t border-[#E8DED0] pt-5">
                                    <Link
                                        href={service.href}
                                        className="flex items-center justify-between text-sm font-semibold text-[#234C45] transition-colors duration-300 hover:text-[#A8B9A5]"
                                    >
                                        <span>اكتشف الخدمة</span>
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A8B9A5] text-lg transition-all duration-300 group-hover:bg-[#234C45] group-hover:text-white group-hover:border-[#234C45]">
                                            ←
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* قسم التواصل */}
                <section className="mt-20 rounded-[60px] bg-[#234C45] px-6 py-14 text-center md:py-16">
                    <p className="mb-3 text-xs tracking-[4px] text-[#A8B9A5]">
                        WE ARE HERE FOR YOU
                    </p>
                    <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                        راحتكم أولويتنا
                    </h2>
                    <p className="mx-auto mb-8 max-w-xl text-sm leading-8 text-[#E8DED0]">
                        لا تترددوا في التواصل معنا، فريقنا يسعد دائمًا بتقديم المساعدة لكم.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-5 border border-[#A8B9A5] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#234C45]"
                    >
                        تواصل معنا
                        <span>←</span>
                    </Link>
                </section>

            </div>
        </main>
    );
}
