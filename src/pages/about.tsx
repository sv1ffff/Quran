import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen py-32 px-8 mesh-gradient transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black gradient-text tracking-tight">
            About Holy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
            A premium digital experience for reading and learning the Quran, designed with modern aesthetics and user-centric features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 rounded-[2.5rem] premium-shadow space-y-4"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.247.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              We aim to make it easy for everyone to read, study, and learn the Quran. Our platform provides a distraction-free environment with high-quality content and a beautiful interface.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-10 rounded-[2.5rem] premium-shadow space-y-4"
          >
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold">The Technology</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Built with cutting-edge technologies like React, Tailwind CSS, and Framer Motion to ensure a fast, responsive, and fluid user experience across all devices.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-12 rounded-[3rem] premium-shadow text-center space-y-8"
        >
          <h3 className="text-3xl font-black">Open Source & Contribution</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            This project is a Sadaqah Jariyah. We hope it benefits the Ummah and becomes a source of knowledge for generations to come.
          </p>
          <div className="pt-4">
            <a 
              href="https://svif.online/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all"
            >
              <span>Visit Developer Profile</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

