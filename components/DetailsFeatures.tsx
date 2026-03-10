import { ShieldCheck, Zap, EyeOff } from "lucide-react";

const DetailsFeatures = () => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">ساده، سریع و امن.</h2>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          ابزاری برای اشتراک‌گذاری متن بدون ثبت‌نام، با تمرکز کامل بر حفظ حریم
          خصوصی شما.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-white/50 backdrop-blur border border-gray-100 p-6 rounded-2xl space-y-3 hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800">رمزنگاری سمت کاربر</h3>
          <p className="text-xs text-gray-500 leading-5">
            اگر رمز عبور تعیین کنید، متن در مرورگر شما رمز شده و سپس ارسال
            می‌شود. سرور هرگز متن اصلی را نمی‌بیند.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white/50 backdrop-blur border border-gray-100 p-6 rounded-2xl space-y-3 hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800">سریع و بدون لاگین</h3>
          <p className="text-xs text-gray-500 leading-5">
            هیچ نیازی به ساخت اکانت نیست. متن را بنویسید، لینک را کپی کنید و
            تمام.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white/50 backdrop-blur border border-gray-100 p-6 rounded-2xl space-y-3 hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800">حذف زمان‌دار</h3>
          <p className="text-xs text-gray-500 leading-5">
            حذف خودکار و کامل اطلاعات از دیتابیس پس از سپری شدن مدت زمان تعیین
            شده توسط شما.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailsFeatures;
