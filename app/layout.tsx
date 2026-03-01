import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir" });

export const metadata: Metadata = {
  title: "ShareText | اشتراک متن مینیمال",
  description: "پلتفرم اشتراک گذاری متن ساده و سریع.",
  metadataBase: new URL("https://sharetext.ir"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        // کلاس bg-gray-50 یک رنگ طوسی بسیار روشن و مات (Solid) است
        className={`${vazir.className} bg-gray-50 text-gray-900 min-h-screen selection:bg-black selection:text-white antialiased`}
      >
        <main className="container mx-auto px-4 py-12 max-w-3xl flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
