import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { sendToDiscord } from "../libs/discord";
import translate from "../translations/translate";
import { motion } from "framer-motion";

export default function Feedback() {
  const [starHovered, setStarHovered] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (rating === 0) return;
    setStatus("sending");

    const success = await sendToDiscord(`🌟 **New Feedback Received**`, {
      title: "User Feedback",
      color: 0xffd700,
      fields: [
        { name: "Rating", value: "⭐".repeat(rating), inline: true },
        { name: "Comment", value: comment || "No comment" },
      ],
      timestamp: new Date().toISOString(),
    });

    if (success) {
      setStatus("success");
      setRating(0);
      setComment("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen py-24 px-8 bg-gradient-to-br from-white to-blue-50 dark:from-[#111827] dark:to-[#1D2121] flex flex-col justify-center items-center text-black dark:text-white transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700"
      >
        <h1 className="text-5xl font-black mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          {translate("feedback.give-feedback")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10 text-lg">
          Your feedback helps us improve the Holy Quran experience.
        </p>

        <div className="flex justify-center space-x-4 mb-10">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setStarHovered(i + 1)}
                onMouseLeave={() => setStarHovered(null)}
                onClick={() => setRating(i + 1)}
                className="cursor-pointer transition-colors duration-200"
              >
                {(starHovered || rating) > i ? (
                  <AiFillStar size={50} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                ) : (
                  <AiOutlineStar size={50} className="text-gray-300 dark:text-gray-600" />
                )}
              </motion.div>
            ))}
        </div>

        <div className="relative group mb-8">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-40 p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all resize-none text-lg shadow-inner"
            placeholder="Tell us what you think..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={status === "sending" || rating === 0}
          className={`w-full py-5 rounded-3xl font-bold text-xl shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 ${
            status === "success" 
              ? "bg-green-500 text-white" 
              : rating > 0 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {status === "sending" ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Sending...
            </span>
          ) : status === "success" ? (
            "Thank you for your feedback! ✨"
          ) : (
            translate("feedback.send")
          )}
        </motion.button>
        
        {status === "error" && (
          <p className="text-red-500 text-sm mt-4 text-center">Something went wrong. Please try again.</p>
        )}
      </motion.div>
    </div>
  );
}

