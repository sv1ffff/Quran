import { Ayah } from "../../types/sourate";
import { HiPlay, HiStop } from "react-icons/hi";

type Props = {
  sourateID: string | undefined;
  aya: Ayah;
  audio: HTMLAudioElement;
};

export default function Aya(props: Props) {
  const setAudio = () => {
    props.audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${props.aya.number}.mp3`;
    props.audio.play();
  };

  const clearAudio = () => {
    props.audio.pause();
    props.audio.currentTime = 0;
  };

  return (
    <div 
      className="group relative mb-6 sm:mb-8 p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl"
    >
      <div className="flex flex-col space-y-6 sm:space-y-8">
        {/* Header with Number and Audio */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg sm:text-xl border border-slate-100 dark:border-slate-700">
              {props.aya.numberInSurah}
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <button
                onClick={setAudio}
                className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <HiPlay size={28} />
              </button>
              <button
                onClick={clearAudio}
                className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <HiStop size={28} />
              </button>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-300 dark:text-slate-600 tracking-[0.2em] uppercase">
            Aya {props.aya.number}
          </div>
        </div>

        {/* Arabic Text (Image) - Full width without scrolling */}
        <div className="w-full py-4">
          <div className="w-full flex justify-center">
            <img
              alt={`Aya ${props.aya.numberInSurah}`}
              className="dark:filter dark:invert-[100%] w-full max-w-full h-auto block"
              src={`https://cdn.islamic.network/quran/images/high-resolution/${props.sourateID}_${props.aya.numberInSurah}.png`}
              style={{ maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

