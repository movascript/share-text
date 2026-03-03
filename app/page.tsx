"use client";

import { useState } from "react";
import { createPostAction } from "./actions";
import { encryptData } from "@/lib/crypto";
import { Lock, Clock, Send } from "lucide-react";
import DetailsFeatures from "@/components/DetailsFeatures";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("24h");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!text) return alert("لطفا متنی برای اشتراک گذاری بنویسید.");

    setLoading(true);

    const content = encryptData(text, password);
    createPostAction(content, expiry, !!password);
  };

  return (
    <main className="min-h-screen py-8 md:px-4 md:py-12 animate-in fade-in slide-in-from-top-2 duration-700">
      <div className="max-w-3xl mx-auto space-y-8">
        <Header />

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

        <DetailsFeatures />

        <Footer />
      </div>
    </main>
  );
}
