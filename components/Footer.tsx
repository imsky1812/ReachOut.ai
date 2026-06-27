import React from "react";

export default function Footer() {
  return (
    <footer
      className="border-t-2 border-white bg-surface-obsidian px-4 md:px-8 py-5 mt-auto"
      id="site-footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        {/* Developer credit */}
        <div className="text-center sm:text-left" id="developer-credit">
          <span className="text-white/70">
            Sarvesh Kumar Yadav
          </span>
          <span className="text-white/30 mx-2" aria-hidden="true">·</span>
          <a
            href="mailto:sarveshkyadav18@gmail.com"
            className="text-cyan-glow hover:text-white transition-colors font-bold"
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
          className="btn-action"
          id="digital-heroes-btn"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  );
}
