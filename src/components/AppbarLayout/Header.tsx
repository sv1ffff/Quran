import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import DarkModeToggle from "../DarkModeToggle";

type Props = {
  openSidebar: () => void;
};

export default function Header(props: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-900">
      <div className="flex items-center space-x-8">
        <button
          onClick={props.openSidebar}
          className="text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
        >
          <HiOutlineMenuAlt3 size={24} />
        </button>
        
        <Link to="/" className="flex items-center">
          <img
            id="brand-img"
            className="w-10 h-10 object-contain"
            alt="quran-logo"
            src="/quran.png"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-8 mr-6 font-bold text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
        </div>

        <div className="flex items-center space-x-3 mr-4">
          <a 
            href="https://www.instagram.com/sv1ffff?igsh=MWYxMGFlbnB6c21ndw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-pink-600 dark:hover:text-pink-500 transition-all border border-slate-100 dark:border-slate-800"
          >
            <FaInstagram size={20} />
          </a>
          <a 
            href="https://www.snapchat.com/add/drxsviff?share_id=M63wDMLLY0U&locale=en-GB" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-yellow-500 transition-all border border-slate-100 dark:border-slate-800"
          >
            <FaSnapchatGhost size={20} />
          </a>
        </div>
        <DarkModeToggle />
      </div>
    </header>
  );
}

