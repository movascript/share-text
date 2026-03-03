"use client";

import { useState } from "react";
import { Calendar, Copy, Check } from "lucide-react";
import { formatDateTimeToPersian } from "@/lib/date";

interface ContentViewerProps {
  content: string;
  createdAt: Date;
}

export default function ContentViewer({
  content,
  createdAt,
}: ContentViewerProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="w-full max-w-3xl animate-in fade-in zoom-in-90 duration-500">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span dir="ltr" className="text-xs font-medium">
              {formatDateTimeToPersian(createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => alert("NOT IMPLEMENTED YET")}
              className="px-2 py-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              title="نمایش متن خام"
              aria-label="نمایش متن خام"
            >
              <span className="text-xs p-0">RAW</span>
            </button>
            <button
              type="button"
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              title="کپی متن"
              aria-label="کپی متن"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Markdown Content */}
        <article className="text-sm md:text-base leading-relaxed wrap-break-word">
          {content}
        </article>
      </div>
    </div>
  );
}
