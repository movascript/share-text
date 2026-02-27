"use client";

import { useState } from "react";
import { createPostAction } from "./actions";
import { encryptData } from "@/lib/crypto";
import { Lock, Clock, Send, ShieldCheck } from "lucide-react";

export default function Home() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("24h");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!text || !password) return alert("لطفا متن و رمز عبور را وارد کنید.");

    setLoading(true);

    // client encryption
    const encrypted = encryptData(text, password);

    const formData = new FormData();
    formData.append("encryptedContent", encrypted);
    formData.append("expiryMode", expiry);

    await createPostAction(formData);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center space-y-4 pt-10">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl mb-4">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-blue-400 via-emerald-400 to-purple-400 text-transparent bg-clip-text drop-shadow-sm">
          اشتراک متن امن
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
          متن خود را بنویسید، رمز بگذارید و لینک امن دریافت کنید. <br />
          <span className="text-sm text-slate-500">
            رمزنگاری کامل سمت کاربر (Client-Side)
          </span>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl"
      >
        <div className="relative mb-6 group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن خود را اینجا بنویسید (پشتیبانی از Markdown)..."
            className="w-full h-64 bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none placeholder:text-slate-600 leading-7 font-mono text-sm md:text-base"
            maxLength={10000}
          />
          <div className="absolute bottom-4 left-4 text-xs text-slate-500 bg-slate-900/80 px-2 py-1 rounded-lg">
            {text.length} / 10000
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label
              htmlFor="pass-in"
              className="flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <Lock className="w-4 h-4 text-rose-400" /> رمز عبور (الزامی)
            </label>
            <input
              id="pass-in"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمزی برای رمزگشایی..."
              className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="exp-in"
              className="flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <Clock className="w-4 h-4 text-amber-400" /> زمان انقضا
            </label>
            <div className="relative">
              <select
                id="exp-in"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="1h">۱ ساعت</option>
                <option value="24h">۲۴ ساعت</option>
                <option value="1w">۱ هفته</option>
                <option value="burn">پاک شدن پس از خواندن (Burn)</option>
                <option value="forever">همیشگی</option>
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                ▼
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full group bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-2xl transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <span className="animate-pulse">در حال پردازش...</span>
          ) : (
            <>
              <span>ایجاد لینک امن</span>
              <Send className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <footer className="text-center text-slate-600 text-sm pb-8">
        <p>&copy; 1404 ShareText. طراحی شده با امنیت و حریم خصوصی.</p>
      </footer>
    </div>
  );
}
