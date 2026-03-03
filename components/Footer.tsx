import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 pt-8 text-center space-y-6">
      <a
        href="https://github.com/your-username/sharetext"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
      >
        <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span>مشاهده سورس کد در گیت‌هاب</span>
      </a>

      <p className="text-gray-400 text-xs font-mono">
        ShareText &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
