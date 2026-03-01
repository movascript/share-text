// src/app/[id]/ContentViewer.tsx
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Calendar, Copy, Check } from "lucide-react";
import Link from "next/link";

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
    <div className="w-full max-w-3xl animate-in fade-in zoom-in duration-500">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm">
        {/* Header: Date & Copy Button */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium">
              {new Date(createdAt).toLocaleDateString("fa-IR")}
            </span>
          </div>
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

        {/* Markdown Content */}
        <article className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:text-gray-800 font-mono text-sm md:text-base leading-relaxed break-words">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block text-gray-500 hover:text-black transition-colors text-sm border-b border-gray-300 hover:border-black pb-0.5"
        >
          اشتراک گذاری یک متن جدید
        </Link>
      </div>
    </div>
  );
}
