import { Ayah } from "../../types/sourate";
import { HiPlay, HiStop } from "react-icons/hi";

type Props = {
  sourateID: string | undefined;
  aya: Ayah;
  audio: HTMLAudioElement;
  fontSize?: number;
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

  const scale = (props.fontSize || 18) / 18;

  return (
    <div 
      className="group relative mb-6 sm:mb-8 p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl"
    >
      <div className="flex flex-col space-y-6 sm:space-y-8">
        {/* Header: Aya number and audio controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base sm:text-lg border border-slate-100 dark:border-slate-700">
              {props.aya.numberInSurah}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={setAudio}
                className="p-2 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <HiPlay size={18} />
              </button>
              <button
                onClick={clearAudio}
                className="p-2 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <HiStop size={18} />
              </button>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-300 dark:text-slate-600 tracking-[0.2em] uppercase">
            Aya {props.aya.number}
          </div>
        </div>

        {/* Arabic Text Image - scalable, no overflow */}
        <div className="w-full py-4 flex justify-center overflow-hidden">
          <div 
            className="transition-all duration-300"
            style={{ 
              width: `calc(100% / ${scale})`,
              transform: `scale(${scale})`,
              transformOrigin: 'center',
            }}
          >
            <img
              alt={`Aya ${props.aya.numberInSurah}`}
              className="dark:filter dark:invert-[100%] w-full h-auto block"
              src={`https://cdn.islamic.network/quran/images/high-resolution/${props.sourateID}_${props.aya.numberInSurah}.png`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
