import { SurahsReference } from "../../types/quran";
import LoadingSpinner from "../LoadingSpinner";
import SourateItem from "./SourateItem";
import { motion } from "framer-motion";

type Props = {
  isLoading: boolean;
  isError: boolean;
  MetaQueryData: SurahsReference[];
};

export default function SourateLists({
  isLoading,
  isError,
  MetaQueryData,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-24 pb-96">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center mt-8 pb-96">
        <h1 className="text-red-500 text-xl font-bold">Network Issues. Please refresh.</h1>
      </div>
    );
  }
  if (MetaQueryData.length === 0) {
    return (
      <div className="flex justify-center items-center mt-8 pb-96">
        <h1 className="text-slate-400 text-xl font-bold italic">No results found.</h1>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 pb-24"
    >
      {MetaQueryData?.map((sourate) => (
        <SourateItem sourate={sourate} key={sourate.number} />
      ))}
    </motion.div>
  );
}
