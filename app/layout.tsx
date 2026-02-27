import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir" });

export const metadata: Metadata = {
  title: "ShareText | اشتراک امن متن",
  description:
    "پلتفرم اشتراک گذاری متن رمزنگاری شده و امن بدون نیاز به ثبت نام.",
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
        className={`${vazir.className} bg-slate-950 text-slate-100 min-h-screen selection:bg-blue-500/30`}
      >
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          {children}
        </main>
      </body>
    </html>
  );
}
