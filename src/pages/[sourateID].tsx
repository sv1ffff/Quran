import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Aya from "../components/Sourate/Aya";
import { useGetSourates } from "../hooks/useQueryApi";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi";

type Props = {};

export default function Sourate(props: Props) {
  const { sourateID } = useParams();
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const audio = new Audio();

  const arabic = useGetSourates(sourateID as string, "");

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
        <h1 className="text-red-500 text-xl font-bold bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
          Network error. Please check your connection.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient transition-colors duration-500 pb-20">
      {/* Auto Scroll Controls */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center space-y-4">
        <AnimatePresence>
          {isAutoScrolling && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Speed</span>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={scrollSpeed} 
                onChange={(e) => setScrollSpeed(parseInt(e.target.value))}
                className="w-24 accent-blue-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-blue-500">{scrollSpeed}x</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className={`p-4 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 min-h-[56px] min-w-[56px] ${
            isAutoScrolling 
              ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {isAutoScrolling ? <HiOutlinePause size={28} /> : <div className="flex flex-col items-center"><HiOutlinePlay size={28} /><span className="text-[10px] sm:text-xs font-bold mt-1">AUTO SCROLL</span></div>}
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
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
