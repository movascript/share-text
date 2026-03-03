"use client";

import { useState } from "react";
import { decryptData } from "@/lib/crypto";
import { Lock } from "lucide-react";
import ContentViewer from "./ContentViewer";

interface ProtectedContentProps {
  encryptedContent: string;
  createdAt: Date;
}

export default function ProtectedContent({
  encryptedContent,
  createdAt,
}: ProtectedContentProps) {
  const [password, setPassword] = useState("");
  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const handleDecrypt = (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(false);

    if (!password.trim()) return;

    const result = decryptData(encryptedContent, password);
    if (result) {
      setDecryptedText(result);
    } else {
      setError(true);
    }
  };

  if (decryptedText !== null) {
    return <ContentViewer content={decryptedText} createdAt={createdAt} />;
  }

  return (
    <div className="w-full max-w-md duration-700">
      <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 mb-6 border border-gray-100">
          <Lock className="w-7 h-7 text-gray-600" />
        </div>

        <h2 className="text-xl font-bold mb-2">محتوای محافظت شده</h2>
        <p className="opacity-50 mb-8 text-sm leading-relaxed">
          نویسنده برای این متن رمز عبور تعیین کرده است.
        </p>

        <form onSubmit={handleDecrypt} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور را وارد کنید..."
              className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-center text-gray-800 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                error
                  ? "border-red-300 focus:ring-red-100 ring-red-100 bg-red-50 text-red-900 placeholder:text-red-300"
                  : "border-gray-200 focus:ring-black/5 focus:border-gray-400 placeholder:text-gray-400"
              }`}
              // biome-ignore lint/a11y/noAutofocus: Requires user input immediately
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs font-medium mt-2 animate-in slide-in-from-top-1">
                رمز عبور اشتباه است
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!password.trim()}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border"
          >
            گشایش و مشاهده متن
          </button>
        </form>
      </div>
    </div>
  );
}
