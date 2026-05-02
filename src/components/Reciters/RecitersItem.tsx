import { Link } from "react-router-dom";
import { Reciter } from "../../types/reciter";

type Props = {
  reciter: Reciter;
};

import { motion } from "framer-motion";

export default function RecitersItem({ reciter }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={`/reciters/${reciter.identifier}`}
        className="group relative flex items-center justify-center p-6 glass-card rounded-2xl premium-shadow border-white/30 dark:border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden text-center min-h-[5rem]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">
          {reciter.name}
        </span>
      </Link>
    </motion.div>
  );
}
