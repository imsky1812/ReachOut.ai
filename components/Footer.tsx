import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-ink-deep-2 px-4 md:px-8 py-4"
      id="site-footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        {/* Developer credit */}
        <div className="text-center sm:text-left" id="developer-credit">
          <span className="text-paper/60">
            Sarvesh Kumar Yadav
          </span>
          <span className="text-paper/30 mx-2" aria-hidden="true">·</span>
          <a
            href="mailto:sarveshkyadav18@gmail.com"
            className="text-brass/80 hover:text-brass transition-colors"
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
          className="inline-flex items-center gap-2 px-4 py-2 bg-paper/10 hover:bg-paper/15 text-paper/80 hover:text-paper rounded-md text-sm font-medium transition-colors border border-paper/10"
          id="digital-heroes-btn"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  );
}
