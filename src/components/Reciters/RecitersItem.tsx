import { Link } from "react-router-dom";
import { Reciter } from "../../types/reciter";
import { motion } from "framer-motion";

type Props = {
  reciter: Reciter;
};

export default function RecitersItem({ reciter }: Props) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
    >
       <Link
         to={`/reciters/${reciter.identifier}`}
         className="group relative flex items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 text-center min-h-[5rem] shadow-sm"
       >
         <span className="font-bold text-base sm:text-lg text-slate-700 dark:text-slate-200 transition-colors relative z-10">
           {reciter.name}
         </span>
       </Link>
    </motion.div>
  );
}
