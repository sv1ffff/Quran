import { FormEvent, useState } from "react";
import { useIntl } from "react-intl";
import translate from "../translations/translate";
import { sendToDiscord } from "../libs/discord";

export default function Form() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const intl = useIntl();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const success = await sendToDiscord(`📩 **New Contact Message**`, {
      title: "Contact Form Submission",
      color: 0x00ff00,
      fields: [
        { name: "Name", value: name || "Anonymous", inline: true },
        { name: "Email", value: email, inline: true },
        { name: "Message", value: message },
      ],
      timestamp: new Date().toISOString(),
    });

    if (success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <div dir="auto" className="w-full">
      <h3 className="mb-8 pt-0 text-center text-3xl font-black gradient-text">
        {translate("footer.contact-us")}
      </h3>
      <form
        className="glass-card premium-shadow rounded-[2.5rem] px-10 py-10 mb-4 w-full max-w-md mx-auto flex flex-col justify-between border-white/40 dark:border-slate-700/50 transition-all duration-500 hover:scale-[1.02]"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 pt-0">
          <input
            type="text"
            placeholder={intl.formatMessage({ id: "footer.your-name" })}
            name="name"
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-base font-bold border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        </div>
        <div className="mb-6 pt-0">
          <input
            type="email"
            placeholder={intl.formatMessage({ id: "footer.email" })}
            name="email"
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-base font-bold border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            required
          />
        </div>
        <div className="mb-8 pt-0">
          <textarea
            placeholder={intl.formatMessage({ id: "footer.your-message" })}
            name="message"
            className="w-full h-40 resize-none px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-base font-bold border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            required
          />
        </div>
        
        <button
          disabled={status === "sending"}
          className={`w-full relative overflow-hidden group py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all duration-500 ${
            status === "success" 
              ? "bg-green-500 text-white" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          type="submit"
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span>{status === "sending" ? "Sending..." : status === "success" ? "Sent Successfully!" : translate("footer.send-message")}</span>
            {status === "idle" && <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
        
        {status === "error" && (
          <p className="text-red-500 text-xs font-bold mt-4 text-center">Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  );
}

