import Image from "next/image";
import Link from "next/link";
import CopyrightYear from "./CopyrightYear";

const hotelPhone = {
  label: "+966 50 000 0000",
  href: "tel:+966500000000",
};

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Makkah%2C+Saudi+Arabia";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: "tiktok" },
  { label: "WhatsApp", href: "https://www.whatsapp.com/", icon: "whatsapp" },
] as const;

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15m6-12v15" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 5 5.2 2 2 0 0 1 7 3Z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "tiktok") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M19.6 7.4a6.7 6.7 0 0 1-4.2-2.1V15a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.2a3 3 0 1 0 1.8 2.8V2h3.2c.3 2.4 1.9 4.3 4.1 4.9v.5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20l.9-4.7a8.5 8.5 0 1 1 16.6-3.7Z" />
      <path d="M8.5 8.5c.5 2.9 2.2 4.7 5.1 5.6l1.2-1.3 2 1c-.2 1.6-1.2 2.4-2.8 2.1-3.8-.9-6.5-3.5-7.3-7.1-.3-1.4.5-2.5 2-2.7l1 2.1-1.2.3Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#234C45] text-white">
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 sm:px-10 lg:px-12 xl:grid-cols-4 xl:gap-8 xl:px-16">
        <section className="flex flex-col items-start gap-3 text-start sm:items-start sm:text-start">
          <Image
            src="/icon.ico"
            alt="شعار فندق الجابري"
            width={100}
            height={100}
            unoptimized
            className="h-20 w-20 translate-y-4 object-contain brightness-0 invert"
          />
          <h2 className="text-xl font-bold tracking-wide">فندق الجابري</h2>
          <div className="h-0.5 w-12 rounded-full bg-[#A8B9A5]" />
          <p className="max-w-xs text-sm leading-8 text-[#E8DED0]">
            نسعى لتوفير تجربة إقامة مريحة ومميزة لضيوفنا.
          </p>
        </section>

        <nav aria-label="روابط سريعة" className="flex flex-col items-start text-start sm:items-start sm:text-start">
          <h2 className="mb-5 text-lg font-bold">روابط سريعة</h2>
          <ul className="flex flex-col items-start gap-4 text-sm text-[#E8DED0] sm:items-start">
            <li><Link href="/" className="transition hover:text-white">الرئيسية</Link></li>
            <li><Link href="/services" className="transition hover:text-white">خدماتنا</Link></li>
            <li><Link href="/my-orders" className="transition hover:text-white">طلباتي</Link></li>
            <li><Link href="/contact" className="transition hover:text-white">تواصل معنا</Link></li>
          </ul>
        </nav>

        <section className="flex flex-col items-start text-start sm:items-start sm:text-start">
          <h2 className="mb-5 text-lg font-bold">تواصل معنا</h2>
          <div className="flex flex-col gap-5 text-sm text-[#E8DED0]">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition hover:text-white">
              <LocationIcon />
              <span>مكة المكرمة</span>
            </a>
            <a href={hotelPhone.href} className="inline-flex items-center gap-3 transition hover:text-white">
              <PhoneIcon />
              <span dir="ltr">{hotelPhone.label}</span>
            </a>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition hover:text-white">
              <MapIcon />
              <span>موقعنا على الخريطة</span>
            </a>
          </div>
        </section>

        <section className="flex flex-col items-start text-start sm:items-start sm:text-start">
          <h2 className="mb-5 text-lg font-bold">تابعونا</h2>
          <ul className="flex flex-col gap-3 text-sm text-[#E8DED0]">
            {socialLinks.map((social) => (
              <li key={social.icon}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex min-h-8 items-center gap-3 rounded-md text-white transition duration-200 hover:translate-x-1 hover:text-[#E8DED0]"
                >
                  <SocialIcon name={social.icon} />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-[#A8B9A5]/30 px-6 py-5 text-start text-sm text-[#E8DED0] sm:px-10 sm:text-center lg:px-16 xl:px-24">
        © <CopyrightYear /> فندق الجابري. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
