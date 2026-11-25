"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { API_URL, currentUser, TOKEN_KEY, USER_KEY, type AdminUser } from "./admin-auth";

const links = [
  ["الرئيسية", "/admin", "⌂"], ["الغرف", "/admin/rooms", "▦"],
  ["الطلبات", "/admin/orders", "▤"], ["الخدمات", "/admin/services", "✧"],
  ["الموظفون", "/admin/staff", "♙"], ["الرسائل", "/admin/messages", "✉"],
  ["التقارير", "/admin/reports", "▥"], ["الإعدادات", "/admin/settings", "⚙"],
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(isLogin);

  useEffect(() => {
    if (isLogin) return;
    let live = true;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { router.replace("/admin/login"); return; }
    currentUser(token).then((value) => {
      if (!live) return;
      if (value.role === "employee" && ["/admin/staff", "/admin/settings"].includes(pathname)) {
        router.replace("/admin"); return;
      }
      localStorage.setItem(USER_KEY, JSON.stringify(value));
      setUser(value); setReady(true);
    }).catch(() => {
      localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY);
      router.replace("/admin/login");
    });
    return () => { live = false; };
  }, [isLogin, pathname, router]);

  async function logout() {
    const token = localStorage.getItem(TOKEN_KEY);
    try { if (token) await fetch(`${API_URL}/logout`, { method: "POST", headers: { Accept: "application/json", Authorization: `Bearer ${token}` } }); } catch { /* local sign-out still completes */ }
    localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY);
    router.replace("/admin/login");
  }

  if (isLogin) return <>{children}</>;
  if (!ready || !user) return <div dir="rtl" className="admin-loading">جارٍ التحقق من صلاحية الدخول…</div>;
  const isEmployee = user.role === "employee";
  const visibleLinks = links.filter(([label]) => !isEmployee || !["الموظفون", "الإعدادات"].includes(label));
  const pageName = links.find(([, href]) => href === pathname)?.[0] ?? "لوحة التحكم";

  return <div dir="rtl" className="admin-shell">
    <aside className="admin-sidebar"><Link className="admin-brand" href="/admin"><img src="/logo-black.png" alt="شعار فندق الجابري" className="h-11 w-11 rounded-full bg-white object-contain p-1"/><span><b>فندق الجابري</b><small>بوابة الإدارة</small></span></Link>
      <div className="sidebar-caption">القائمة الرئيسية</div><nav className="admin-nav">{visibleLinks.map(([label, href, icon])=><Link key={href} href={href} className={`admin-nav-link ${pathname===href?"active":""}`}><span className="nav-icon">{icon}</span>{label}<span className="nav-chevron">‹</span></Link>)}</nav>
      <div className="sidebar-bottom"><span className="status-dot"/> النظام متصل</div>
    </aside>
    <section className="admin-main"><header className="admin-header"><div><p className="admin-breadcrumb">فندق الجابري　/　الإدارة</p><h1>{pageName}</h1></div><div className="admin-user"><span className="user-avatar">{user.name.slice(0,1)}</span><span className="user-details"><b>{user.name}</b><small>{isEmployee?"موظف":"مدير النظام"}</small></span><button className="logout-button" onClick={logout}>تسجيل الخروج <span>↪</span></button></div></header><main className="admin-content">{children}</main></section>
  </div>;
}
