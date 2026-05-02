import RecitersList from "../../components/Reciters/RecitersList";
import data from "../../libs/vocalsEditions.json";
import { motion } from "framer-motion";

export default function Reciters() {
  const dataByLang = (lang: string) =>
    [...data].filter(({ identifier }) => identifier.startsWith(lang));

  return (
    <div className="min-h-screen mesh-gradient transition-colors duration-500 pt-32 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-8 space-y-16"
      >
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-black gradient-text tracking-tight">
            Quran Reciters
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Explore beautiful recitations from around the world.</p>
        </div>

        <div className="space-y-24">
          <section className="space-y-8">
            <div className="flex items-center space-x-6">
              <h2 className="text-3xl font-black">Arabic</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <RecitersList reciters={dataByLang("ar")} />
          </section>

          <section className="space-y-8">
            <div className="flex items-center space-x-6">
              <h2 className="text-3xl font-black">English</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <RecitersList reciters={dataByLang("en")} />
          </section>
        </div>
      </motion.div>
    </div>
  );
}
