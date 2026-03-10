import type { Metadata } from "next";
import { danaFont } from "@/fonts/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "اشتراک‌گذاری متن",
  description: "پلتفرم اشتراک گذاری متن | ساده، سریع و امن.",
  metadataBase: new URL("https://sharetext.ir"),
  robots: { index: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${danaFont.className} bg-gray-50 text-gray-900 min-h-screen selection:bg-gray-800 selection:text-white antialiased`}
      >
        <main className="container mx-auto px-4 py-12 max-w-3xl flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
