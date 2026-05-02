import translate from "../../translations/translate";
import Form from "../Form";

export default function Footer(props: {}) {
  return (
    <footer
      dir="auto"
      className="px-8 md:px-24 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-slate-100 dark:border-slate-900"
    >
      <div
        id="info-container"
        className="flex flex-col justify-start space-y-10"
      >
        <div className="flex items-center space-x-4">
          <img src="/quran.png" alt="Logo" className="w-10 h-10 object-contain" />
          <h2 className="text-3xl font-bold">
            Holy
          </h2>
        </div>
        
        <div className="space-y-6">
           <div className="font-medium text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
             {translate("footer.description")}
           </div>
           <div className="text-slate-400 dark:text-slate-500 leading-relaxed max-w-xl text-base">
             {translate("footer.paragraph")}
           </div>
         </div>

        <div className="pt-10 border-t border-slate-100 dark:border-slate-900">
          <div className="inline-block">
            <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em] mb-4">Crafted with passion</p>
            <a 
              href="https://svif.online/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 text-xl font-bold hover:opacity-70 transition-opacity"
            >
              <span>Developed by</span>
              <span className="text-slate-900 dark:text-white">saif fikry</span>
              <svg className="w-5 h-5 opacity-40 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center lg:justify-end items-start pt-10 lg:pt-0">
        <Form />
      </div>
      
      <div className="col-span-full text-center pt-16 text-slate-400 dark:text-slate-500 text-sm font-medium">
        © {new Date().getFullYear()} Holy. All rights reserved. • Built with excellence.
      </div>
    </footer>
  );
}

