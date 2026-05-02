import { Ayah } from "../../types/sourate";
import { HiPlay, HiStop } from "react-icons/hi";
import LoadingSpinner from "../LoadingSpinner";

type Props = {
  sourateID: string | undefined;
  aya: Ayah;
  translatedAya: Ayah;
  isTranslatedLoading: boolean;
  audio: HTMLAudioElement;
};

export default function Aya(props: Props) {
  const setAudio = () => {
    props.audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${props.aya.number}.mp3 `;
    props.audio.play();
  };

  const clearAudio = () => {
    props.audio.pause();
    props.audio.currentTime = 0;
  };

  const translated = props.isTranslatedLoading ? (
    <div className="flex justify-center items-center py-8">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  ) : (
    <div id="translated" dir="auto" className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
      {props.translatedAya.text}
    </div>
  );

  return (
    <div 
      className="group relative mb-12 p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl"
    >
      <div className="flex flex-col space-y-10">
        {/* Header with Number and Audio */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg border border-slate-100 dark:border-slate-700">
              {props.aya.numberInSurah}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={setAudio}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <HiPlay size={24} />
              </button>
              <button
                onClick={clearAudio}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <HiStop size={24} />
              </button>
            </div>
          </div>
          <div className="text-[10px] font-bold text-slate-300 dark:text-slate-600 tracking-[0.2em] uppercase">
            Aya {props.aya.number}
          </div>
        </div>

        {/* Arabic Text (Image) */}
        <div className="flex justify-center md:justify-end py-4">
          <img
            alt={`Aya ${props.aya.numberInSurah}`}
            className="dark:filter dark:invert-[100%] max-w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
            src={`https://cdn.islamic.network/quran/images/high-resolution/${props.sourateID}_${props.aya.numberInSurah}.png`}
          />
        </div>

        {/* Translation */}
        <div className="pt-8 border-t border-slate-50 dark:border-slate-800/50">
          {translated}
        </div>
      </div>
    </div>
  );
}

