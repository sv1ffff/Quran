import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks";
import { SurahsReference } from "../../types/quran";
import { motion } from "framer-motion";

type Props = {
  sourate: SurahsReference;
};

export default function SourateItem({ sourate }: Props) {
  const { translation } = useTranslation();
  const isRtl = translation !== "ar";

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={item}
    >
      <Link
        to={`/${sourate.number}`}
        className="group relative block p-8 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm"
      >
        <div className="flex items-center space-x-6 relative z-10">
          <div
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg border border-slate-100 dark:border-slate-700"
          >
            {sourate.number}
          </div>
          
          <div className="flex-1 flex flex-col min-w-0">
            <h3 className="text-xl font-bold truncate transition-colors duration-300">
              {isRtl ? sourate.englishName : sourate.name}
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
              {sourate.englishNameTranslation}
            </p>
          </div>

          <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
             <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
               {sourate.numberOfAyahs}
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

