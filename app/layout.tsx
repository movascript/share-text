import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir" });

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
        className={`${vazir.className} bg-gray-50 text-gray-900 min-h-screen selection:bg-gray-800 selection:text-white antialiased`}
      >
        <main className="container mx-auto px-4 py-12 max-w-3xl flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
