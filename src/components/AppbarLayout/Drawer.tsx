import { CgClose, CgHome } from "react-icons/cg";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { GiSoundWaves } from "react-icons/gi";
import { MdOutlineFeedback } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import ClickAwayListener from "react-click-away-listener";
import translate from "../../translations/translate";
import { useTranslation } from "../../hooks";
import { Locale } from "../../types/translations";
import { ChangeEvent } from "react";

type Props = {
  closeSidebar: () => void;
};

const Drawer = motion((props: Props) => {
  const { setTranslation, translation } = useTranslation();
  const onTranslate = (e: ChangeEvent<HTMLSelectElement>) => {
    setTranslation(e.target.value as Locale);
  };

  const isRtl = translation === "ar";

  const DrawerVariants: Variants = {
    initial: { x: isRtl ? "100%" : "-100%" },
    animate: { x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
    exit: { x: isRtl ? "100%" : "-100%", transition: { duration: 0.3 } },
  };

  const OpacityVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <motion.div
        variants={OpacityVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
      />
      <ClickAwayListener onClickAway={props.closeSidebar}>
        <motion.div
          variants={DrawerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`fixed top-0 ${
            isRtl ? "right-0" : "left-0"
          } z-[60] h-screen w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl border-x border-slate-200 dark:border-slate-800 flex flex-col`}
        >
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/quran.png" alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-black text-xl gradient-text">Holy</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={props.closeSidebar}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500"
            >
              <CgClose size={24} />
            </motion.button>
          </div>

          <div className="px-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              {translate("sidebar.choose-language")}
            </label>
            <select
              onChange={onTranslate}
              defaultValue={translation}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm font-bold p-3 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="en-US">English</option>
              <option value="ar">عربي</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <nav className="flex-1 overflow-y-auto p-8">
            <ul className="space-y-4">
              {links.map((link, key) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: key * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={props.closeSidebar}
                    className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="p-8 border-t border-slate-100 dark:border-slate-800">
             <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20">
                <p className="text-xs font-medium opacity-80 mb-1">Developed by</p>
                <h4 className="font-black text-lg">Saif Fikry</h4>
                <a href="https://svif.online/" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest font-black opacity-60 hover:opacity-100 transition-opacity">Visit Portfolio</a>
             </div>
          </div>
        </motion.div>
      </ClickAwayListener>
    </>
  );
});

const links = [
  {
    name: translate("sidebar.home"),
    icon: <CgHome size={20} />,
    path: "/",
  },
  {
    name: translate("sidebar.reciters"),
    icon: <GiSoundWaves size={20} />,
    path: "/reciters",
  },
  {
    name: translate("sidebar.about"),
    icon: <HiQuestionMarkCircle size={20} />,
    path: "/about",
  },
  {
    name: translate("sidebar.feedback"),
    icon: <MdOutlineFeedback size={20} />,
    path: "/feedback",
  },
];

export default Drawer;
