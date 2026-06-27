import React from "react";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/5 bg-white/[0.01] backdrop-blur-md px-4 md:px-8 py-5 mt-auto"
      id="site-footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        {/* Developer credit */}
        <div className="text-center sm:text-left" id="developer-credit">
          <span className="text-white/45">
            Sarvesh Kumar Yadav
          </span>
          <span className="text-white/20 mx-2" aria-hidden="true">·</span>
          <a
            href="mailto:sarveshkyadav18@gmail.com"
            className="text-cyan-glow/80 hover:text-cyan-glow transition-colors font-medium"
            id="developer-email"
          >
            sarveshkyadav18@gmail.com
          </a>
        </div>

        {/* Digital Heroes button */}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
          id="digital-heroes-btn"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  );
}
