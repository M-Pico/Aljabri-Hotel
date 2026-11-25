export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
export const TOKEN_KEY = "jabri_admin_token";
export const USER_KEY = "jabri_admin_user";

export type AdminUser = { id: number; name: string; email: string; role: "admin" | "employee" };

export function authHeaders(): HeadersInit {
  const token = typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
  return { Accept: "application/json", "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export async function currentUser(token: string): Promise<AdminUser> {
  const response = await fetch(`${API_URL}/me`, { headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, cache: "no-store" });
  const result = await response.json();
  if (!response.ok || !result.user) throw new Error("انتهت الجلسة");
  return result.user as AdminUser;
}
