import { ChangeEventHandler } from "react";
import { useIntl } from "react-intl";
import { useTranslation } from "../hooks";
import { HiSearch } from "react-icons/hi";

type Props = {
  updateSearch: ChangeEventHandler;
};

export default function SearchInput(props: Props) {
  const intl = useIntl();
  const { translation } = useTranslation();
  const isRtl = translation === "ar";

  return (
    <div className="flex justify-center w-full max-w-4xl mx-auto px-4">
      <div className="relative w-full">
        <div className={`absolute inset-y-0 ${isRtl ? 'right-6' : 'left-6'} flex items-center pointer-events-none text-slate-400`}>
          <HiSearch size={24} />
        </div>

        <input
          onChange={props.updateSearch}
          type="search"
          id="search"
          className={`${
            isRtl ? "text-right pr-16" : "text-left pl-16"
          } w-full h-16 rounded-2xl text-lg font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-all placeholder:text-slate-400 shadow-sm`}
          placeholder={intl.formatMessage({ id: "app.search-label" })}
        />
      </div>
    </div>
  );
}

