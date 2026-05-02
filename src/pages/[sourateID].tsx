import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Aya from "../components/Sourate/Aya";
import { useGetSourates } from "../hooks/useQueryApi";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePause, HiOutlinePlay, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

type Props = {};

export default function Sourate(props: Props) {
  const { sourateID } = useParams();
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [ayaFontSize, setAyaFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('ayaFontSize');
    return saved ? parseInt(saved, 10) : 18;
  });
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const audio = new Audio();

  const arabic = useGetSourates(sourateID as string, "");

  // Persist font size to localStorage
  useEffect(() => {
    localStorage.setItem('ayaFontSize', ayaFontSize.toString());
  }, [ayaFontSize]);

  const increaseFontSize = () => {
    if (ayaFontSize < 28) setAyaFontSize(ayaFontSize + 2);
  };

  const decreaseFontSize = () => {
    if (ayaFontSize > 14) setAyaFontSize(ayaFontSize - 2);
  };

  useEffect(() => {
    if (isAutoScrolling) {
      scrollInterval.current = setInterval(() => {
        window.scrollBy({
          top: scrollSpeed,
          behavior: 'smooth'
        });
      }, 50);
    } else {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    }
    return () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };
  }, [isAutoScrolling, scrollSpeed]);

  if (arabic.isLoading) {
    return (
      <div className="flex justify-center items-center pt-24 h-screen dark:bg-[#0F172A] bg-slate-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (arabic.isError) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-[#0F172A] bg-slate-50">
        <h1 className="text-red-500 text-xl sm:text-2xl font-bold bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
          Network error. Please check your connection.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient transition-colors duration-500 pb-20">
      {/* Auto Scroll & Font Size Controls */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center space-y-4">
        <AnimatePresence>
          {isAutoScrolling && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Speed</span>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={scrollSpeed} 
                onChange={(e) => setScrollSpeed(parseInt(e.target.value))}
                className="w-24 accent-blue-500 cursor-pointer"
              />
              <span className="text-sm font-bold text-blue-500">{scrollSpeed}x</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Font Size Control */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center space-x-2"
        >
          <button
            onClick={decreaseFontSize}
            disabled={ayaFontSize <= 14}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlineMinus size={20} />
          </button>
          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 px-2">
            {ayaFontSize}px
          </span>
          <button
            onClick={increaseFontSize}
            disabled={ayaFontSize >= 28}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlinePlus size={20} />
          </button>
        </motion.div>

        {/* Auto Scroll Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className={`p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 min-h-[60px] min-w-[60px] ${
            isAutoScrolling 
              ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {isAutoScrolling ? <HiOutlinePause size={28} /> : <div className="flex flex-col items-center"><HiOutlinePlay size={28} /><span className="text-xs sm:text-sm font-bold mt-1">AUTO SCROLL</span></div>}
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="pt-32 pb-12">
          {/* Editions selector removed - Arabic only */}
        </div>
        
        <motion.ul 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {arabic.data?.ayahs.map((aya) => (
            <Aya
              key={aya.number}
              sourateID={sourateID}
              aya={aya}
              audio={audio}
              fontSize={ayaFontSize}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
