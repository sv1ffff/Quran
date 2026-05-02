import { ChangeEvent, useState } from "react";
import SourateLists from "../components/Home/SourateLists";
import SearchInput from "../components/SearchInput";
import { useGetMetaQuranData } from "../hooks/useQueryApi";
import { SurahsReference } from "../types/quran";
import { motion } from "framer-motion";
import { normalizeArabic } from "../libs/normalizeArabic";

type Props = {};

export default function Home(props: Props) {
  const [search, setSearch] = useState("");
  const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { data: QuranMetaData, isLoading, isError } = useGetMetaQuranData();
  
  const filtredMetaData = QuranMetaData?.surahs.references.filter((surah) => {
    const normalizedSearch = normalizeArabic(search);
    const normalizedSurahName = normalizeArabic(surah.name);
    const normalizedEnglishName = surah.englishName.toLowerCase();
    
    return (
      normalizedEnglishName.includes(normalizedSearch) ||
      normalizedSurahName.includes(normalizedSearch)
    );
  });

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-12">
              <motion.img
                src="/quran.png"
                alt="Quran Logo"
                className="relative z-10 w-32 h-32 md:w-40 md:h-40 object-contain dark:invert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Experience the Quran with a beautiful and modern interface.
            </motion.p>
            
            <motion.button
              whileHover={{ y: 5 }}
              onClick={() => document.getElementById('search-container')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center space-y-4 text-slate-400 dark:text-slate-600 font-bold"
            >
              <span className="uppercase tracking-[0.3em] text-[10px]">Explore Surahs</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main id="search-container" className="max-w-6xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SearchInput updateSearch={updateSearch} />
        </motion.div>

        <SourateLists
          MetaQueryData={filtredMetaData as SurahsReference[]}
          isLoading={isLoading}
          isError={isError}
        />
      </main>
    </div>
  );
}
