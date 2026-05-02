import { ChangeEventHandler } from "react";
import { useTranslation } from "../../hooks";
import editions from "../../libs/edition.json";
import translate from "../../translations/translate";
import { HiTranslate } from "react-icons/hi";

type Props = {
  updateEdition: ChangeEventHandler;
};

export default function Editions(props: Props) {
  const { translation } = useTranslation();
  const isRtl = translation === "ar";

  return (
    <div className="max-w-7xl mx-auto px-8 pt-32 pb-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="glass-card p-6 rounded-3xl premium-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <HiTranslate size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{translate("sourate.edition-label")}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Select your preferred translation and language.</p>
          </div>
        </div>
        
        <div className="relative group">
          <select
            id="editions"
            onChange={props.updateEdition}
            className="appearance-none cursor-pointer w-full md:w-80 h-14 pl-6 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
          >
            {editions.data.map((edition) => (
              <option
                key={edition.identifier}
                value={edition.identifier}
                className="bg-white dark:bg-slate-900"
              >
                {edition.name} ({edition.language.toUpperCase()})
              </option>
            ))}
          </select>
          <div className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'right-4'} flex items-center pointer-events-none text-slate-400`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

