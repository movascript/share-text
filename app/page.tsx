"use client";

import { useState } from "react";
import { createPostAction } from "./actions";
import { encryptData } from "@/lib/crypto";
import {
  Lock,
  Clock,
  Send,
  Github,
  ShieldCheck,
  Zap,
  EyeOff,
} from "lucide-react";

export default function Home() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("24h");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return alert("لطفا متنی برای اشتراک گذاری بنویسید.");

    setLoading(true);

    try {
      const content = encryptData(text, password);
      await createPostAction(content, expiry, !!password);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("خطایی رخ داد. لطفا مجدد تلاش کنید.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-8 md:px-4 md:py-12 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold md:font-extrabold tracking-tight text-gray-800">
            اشتراک‌گذاری متن
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white border flex flex-col gap-4 border-gray-200/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-200/60 duration-500"
        >
          <div className="relative group">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="متن خود را اینجا بنویسید..."
              className="w-full h-64 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all resize-none placeholder:text-gray-400 leading-8 font-mono text-base"
              maxLength={10000}
              required
            />
            <div
              dir="ltr"
              className={`absolute bottom-4 left-4 text-[10px] font-mono text-gray-400 bg-white/70 backdrop-blur px-2 py-1 rounded-md border border-gray-100 shadow-sm ${text.length >= 10000 ? "text-red-300" : ""}`}
            >
              {text.length} / 10000
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="pass-in"
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <Lock className="w-4 h-4 text-gray-400" />
                رمز عبور
                <span className="text-[10px] text-gray-400 font-normal bg-gray-100 px-2 py-0.5 rounded-full">
                  اختیاری
                </span>
              </label>
              <input
                id="pass-in"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="برای رمزنگاری وارد کنید"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-300 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="exp-in"
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <Clock className="w-4 h-4 text-gray-400" /> زمان انقضا
              </label>
              <div className="relative">
                <select
                  id="exp-in"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all appearance-none cursor-pointer text-sm"
                >
                  <option value="10m">۱۰ دقیقه</option>
                  <option value="1h">۱ ساعت</option>
                  <option value="24h">۲۴ ساعت</option>
                  <option value="1w">۱ هفته</option>
                  <option value="1y">۱ سال</option>
                  <option value="never">همیشگی</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full group bg-black hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-xl transition-all transform active:scale-[0.99] shadow-lg shadow-gray-300/50 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.2s]" />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.4s]" />
              </span>
            ) : (
              <>
                <span>ایجاد لینک اشتراک</span>
                <Send className="w-4 h-4 group-hover:-translate-x-1 transition-transform -rotate-90" />
              </>
            )}
          </button>
        </form>

        {/* --- بخش ۲: اطلاعات و ویژگی‌ها --- */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              ساده، سریع و امن.
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              ابزاری برای اشتراک‌گذاری متن بدون ثبت‌نام، با تمرکز کامل بر حفظ
              حریم خصوصی شما.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/50 backdrop-blur border border-gray-100 p-6 rounded-2xl space-y-3 hover:bg-white transition-colors">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800">رمزنگاری سمت کاربر</h3>
              <p className="text-xs text-gray-500 leading-5">
                اگر رمز عبور تعیین کنید، متن در مرورگر شما رمز شده و سپس ارسال
                می‌شود. سرور هرگز متن اصلی را نمی‌بیند.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/50 backdrop-blur border border-gray-100 p-6 rounded-2xl space-y-3 hover:bg-white transition-colors">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800">سریع و بدون لاگین</h3>
              <p className="text-xs text-gray-500 leading-5">
                هیچ نیازی به ساخت اکانت نیست. متن را بنویسید، لینک را کپی کنید و
                تمام.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/50 backdrop-blur border border-gray-100 p-6 rounded-2xl space-y-3 hover:bg-white transition-colors">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800">حذف زمان‌دار</h3>
              <p className="text-xs text-gray-500 leading-5">
                حذف خودکار و کامل اطلاعات از دیتابیس پس از سپری شدن مدت زمان
                تعیین شده توسط شما.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-200 pt-8 text-center space-y-6">
          <a
            href="https://github.com/your-username/sharetext"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
          >
            <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>مشاهده سورس کد در گیت‌هاب</span>
          </a>

          <p className="text-gray-400 text-xs font-mono">
            ShareText &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
}
