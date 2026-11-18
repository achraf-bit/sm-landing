"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Users, GraduationCap, Package, DollarSign,
  Building2, ShieldCheck, ChevronRight,
  BarChart3, BookOpen, UserPlus, Wallet, TrendingUp, CheckCircle, Menu, X,
} from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

function Nav({ onContactClick }: { onContactClick: () => void }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">{t("homeTitle")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <button onClick={onContactClick} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              {t("contactUs")}
            </button>
            <a href={`${APP_URL}/login`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              {t("login")}
            </a>
            <a href={`${APP_URL}/register`} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
              {t("register")}
            </a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t py-4 space-y-3">
            <div className="px-1"><LanguageSwitcher /></div>
            <button onClick={() => { onContactClick(); setOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-2">
              {t("contactUs")}
            </button>
            <a href={`${APP_URL}/login`} onClick={() => setOpen(false)} className="block text-sm text-gray-600 py-2">{t("login")}</a>
            <a href={`${APP_URL}/register`} onClick={() => setOpen(false)} className="block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white text-center">{t("register")}</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const contactRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(false);

  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }
    setSending(false);
  };

  const features = [
    { icon: Users, title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: GraduationCap, title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: Package, title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: DollarSign, title: t("feature4Title"), desc: t("feature4Desc") },
    { icon: Building2, title: t("feature5Title"), desc: t("feature5Desc") },
    { icon: ShieldCheck, title: t("feature6Title"), desc: t("feature6Desc") },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav onContactClick={scrollToContact} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-primary mb-6">
                <CheckCircle className="h-3 w-3" />
                Multi-tenant · Secure · Fast
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                {t("heroHeadline")}
              </h1>
              <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">{t("heroDesc")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`${APP_URL}/register`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
                  {t("getStarted")} <ChevronRight className="h-4 w-4" />
                </a>
                <button onClick={scrollToContact} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  {t("contactUs")}
                </button>
              </div>
            </div>

            {/* Stats preview */}
            <div className="relative">
              <div className="rounded-2xl border bg-gray-50 p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Dashboard Overview</span>
                  <span className="text-xs text-gray-400">Live</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: Users, label: t("totalStudents"), value: "248", color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: GraduationCap, label: t("totalTeachers"), value: "18", color: "text-purple-600", bg: "bg-purple-50" },
                    { icon: BookOpen, label: t("activeClasses"), value: "32", color: "text-green-600", bg: "bg-green-50" },
                    { icon: UserPlus, label: t("activeEnrollments"), value: "310", color: "text-orange-600", bg: "bg-orange-50" },
                  ].map(({ icon: Icon, label, value, color, bg }) => (
                    <div key={label} className="rounded-xl bg-white border p-3">
                      <div className={`inline-flex rounded-lg p-2 ${bg} mb-2`}>
                        <Icon className={`h-4 w-4 ${color}`} />
                      </div>
                      <div className="text-xl font-bold">{value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-white border p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-600">{t("collectionRate")}</span>
                    <span className="text-xs font-bold text-green-600">87.4%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "87.4%" }} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    {[
                      { icon: TrendingUp, label: t("paid"), value: "12,480 DH", color: "text-green-600" },
                      { icon: Wallet, label: t("partial"), value: "1,920 DH", color: "text-orange-500" },
                      { icon: BarChart3, label: t("unpaid"), value: "960 DH", color: "text-red-500" },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label}>
                        <Icon className={`h-3 w-3 mx-auto mb-1 ${color}`} />
                        <div className={`text-xs font-bold ${color}`}>{value}</div>
                        <div className="text-xs text-gray-400">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white border shadow-lg px-4 py-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-700">Real-time sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">{t("featuresTitle")}</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">{t("featuresDesc")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white border p-6 hover:shadow-md transition-shadow">
                <div className="inline-flex rounded-xl bg-blue-50 p-3 mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">{t("previewTitle")}</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">{t("previewDesc")}</p>
          </div>
          <div className="rounded-2xl border bg-gray-50 p-4 shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 rounded-md bg-white border px-3 py-1 text-xs text-gray-400">
                app.schoolmanagement.com/dashboard
              </div>
            </div>
            <div className="flex gap-3 h-64 sm:h-80">
              <div className="hidden sm:flex w-40 rounded-xl bg-white border flex-col p-3 gap-1">
                {["Dashboard", t("students"), t("teachers"), t("classes"), t("sessions"), t("enrollments"), t("payments")].map((item, i) => (
                  <div key={item} className={`rounded-lg px-3 py-1.5 text-xs ${i === 0 ? "bg-primary text-white font-medium" : "text-gray-500"}`}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["248", "18", "32", "87%"].map((val, i) => (
                    <div key={i} className="rounded-xl bg-white border p-3">
                      <div className="text-lg font-bold text-gray-800">{val}</div>
                      <div className="h-1.5 mt-2 rounded-full bg-gray-100">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${[70, 45, 60, 87][i]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1 rounded-xl bg-white border p-3">
                  <div className="text-xs font-medium text-gray-600 mb-3">{t("paymentRecords")}</div>
                  <div className="space-y-2">
                    {[
                      { name: "Ahmed Benali", status: "paid", amount: "120 DH" },
                      { name: "Sara Moussaoui", status: "partial", amount: "80 DH" },
                      { name: "Youssef Idrissi", status: "unpaid", amount: "0 DH" },
                      { name: "Fatima Zahra", status: "paid", amount: "150 DH" },
                    ].map(({ name, status, amount }) => (
                      <div key={name} className="flex items-center justify-between text-xs">
                        <span className="text-gray-700">{name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{amount}</span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            status === "paid" ? "bg-green-100 text-green-700" :
                            status === "partial" ? "bg-orange-100 text-orange-700" :
                            "bg-red-100 text-red-700"
                          }`}>{t(status as "paid" | "partial" | "unpaid")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3.5 text-white shadow-xl">
          <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
          <span className="text-sm font-medium">{t("contactSuccess")}</span>
        </div>
      )}

      {/* Contact */}
      <section ref={contactRef} className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">{t("contactTitle")}</h2>
            <p className="mt-4 text-gray-500">{t("contactDesc")}</p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white border p-6 sm:p-8 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contactName")}</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contactEmail")}</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contactMessage")}</label>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none" />
            </div>
            <button type="submit" disabled={sending}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-60">
              {sending ? t("contactSending") : t("contactSend")}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <BookOpen className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold">{t("homeTitle")}</span>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} {t("homeTitle")}. {t("footerRights")}</p>
          <div className="flex items-center gap-4">
            <a href={`${APP_URL}/login`} className="text-xs text-gray-500 hover:text-gray-900">{t("login")}</a>
            <a href={`${APP_URL}/register`} className="text-xs text-gray-500 hover:text-gray-900">{t("register")}</a>
            <button onClick={scrollToContact} className="text-xs text-gray-500 hover:text-gray-900">{t("contactUs")}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
