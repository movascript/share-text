"use client";

import { useState } from "react";
import { decryptData } from "@/lib/crypto";
import ReactMarkdown from "react-markdown";
import { Lock, Unlock, AlertTriangle, Calendar } from "lucide-react";

export default function DecryptViewer({
  encryptedContent,
  createdAt,
  isBurnOnRead,
}: {
  encryptedContent: string;
  createdAt: Date;
  isBurnOnRead: boolean;
}) {
  const [password, setPassword] = useState("");
  const [decrypted, setDecrypted] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const handleDecrypt = (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(false);
    const result = decryptData(encryptedContent, password);
    if (result) {
      setDecrypted(result);
    } else {
      setError(true);
    }
  };

  if (decrypted) {
    return (
      <div className="w-full animate-in fade-in zoom-in duration-500">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-emerald-400">
              <Unlock className="w-5 h-5" />
              <span className="font-bold text-sm">رمزگشایی موفق</span>
            </div>
            <div className="text-slate-500 text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(createdAt).toLocaleDateString("fa-IR")}
            </div>
          </div>

          <article className="prose prose-invert prose-lg max-w-none prose-headings:text-indigo-300 prose-a:text-blue-400 prose-code:text-rose-300 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-white/5">
            <ReactMarkdown>{decrypted}</ReactMarkdown>
          </article>

          {isBurnOnRead && (
            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-3 text-orange-400 text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p>
                این پیام به صورت "Burn on Read" تنظیم شده بود و اکنون از سرور
                حذف شده است. اگر صفحه را رفرش کنید، دیگر قابل دسترسی نخواهد بود.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ایجاد یک متن جدید
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-6 ring-1 ring-white/10">
          <Lock className="w-8 h-8 text-slate-300" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          محتوای محافظت شده
        </h2>
        <p className="text-slate-400 mb-8 text-sm">
          برای مشاهده محتوا، لطفا رمز عبوری که فرستنده تعیین کرده است را وارد
          کنید.
        </p>

        <form onSubmit={handleDecrypt} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور..."
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-center text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            // biome-ignore lint/a11y/noAutofocus: <nonofurbiz>
            autoFocus
          />

          {error && (
            <p className="text-rose-400 text-xs animate-pulse">
              رمز عبور اشتباه است!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 px-6 rounded-xl transition-all transform active:scale-95"
          >
            مشاهده متن
          </button>
        </form>
      </div>
    </div>
  );
}
