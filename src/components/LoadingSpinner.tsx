import { motion } from "framer-motion";

type Props = {
  size?: number | string;
  className?: string;
};

export default function LoadingSpinner({ className = "w-16 h-16" }: Props) {
  return (
    <div role="status" className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative ${className}`}>
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-blue-500/20"
        ></motion.div>
        
        {/* Animated Arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500"
        ></motion.div>

        {/* Pulse Center */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full bg-blue-500/10 backdrop-blur-sm"
        ></motion.div>
      </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-base sm:text-lg font-bold tracking-widest text-blue-600/60 dark:text-blue-400/60 uppercase"
        >
          Loading
        </motion.p>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

