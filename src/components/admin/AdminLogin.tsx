"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { loginAdmin } from "@/lib/adminApi";

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await loginAdmin(email, password);
      localStorage.setItem("tpap_admin_token", response.token);
      localStorage.setItem("tpap_admin_name", response.admin.name);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-forest-950 px-4 text-white">
      <div className="w-full max-w-md border border-white/10 bg-white/[0.06] p-6 shadow-premium backdrop-blur">
        <div className="bg-[#f8f6f1] p-7 text-charcoal-950">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-700">
            TPAP Admin
          </p>
          <h1 className="mt-4 font-display text-5xl">Admin Login</h1>
          <p className="mt-3 text-sm leading-6 text-charcoal-600">
            Sign in to manage applications, complaints, inquiries, and content.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            {error ? (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <label className="grid gap-2 text-sm font-semibold">
              Email
              <span className="flex items-center gap-3 border border-charcoal-100 bg-white px-4 py-3">
                <Mail size={18} className="text-forest-700" />
                <input
                  className="w-full bg-transparent outline-none"
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  required
                  type="email"
                  value={email}
                />
              </span>
            </label>

            <label className="grid gap-2 text-sm font-semibold">
              Password
              <span className="flex items-center gap-3 border border-charcoal-100 bg-white px-4 py-3">
                <LockKeyhole size={18} className="text-forest-700" />
                <input
                  className="w-full bg-transparent outline-none"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  type="password"
                  value={password}
                />
              </span>
            </label>

            <button
              className="rounded-full bg-forest-800 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
