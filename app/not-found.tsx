import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in duration-500">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300 text-center max-w-md w-full">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6 border border-gray-100">
          <FileQuestion className="w-10 h-10 text-gray-400" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">
          محتوایی پیدا نشد!
        </h3>

        <p className="text-gray-500 mb-10 text-sm leading-relaxed">
          ممکن است لینک وارد شده اشتباه باشد یا زمان انقضای لینک سر رسیده باشد و
          برای همیشه از سرور پاک شده باشد.
        </p>

        <Link
          href="/"
          className="w-full group inline-flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-xl transition-all transform active:scale-[0.99] shadow-md shadow-gray-200"
        >
          <span>ایجاد یک متن جدید</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
