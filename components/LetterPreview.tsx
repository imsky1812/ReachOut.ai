"use client";

import React, { useState } from "react";

interface LetterPreviewProps {
  subject: string | null;
  body: string | null;
  mode: "cold_email" | "cover_letter";
  company: string;
  role: string;
  recipientEmail: string;
  error: string | null;
}

export default function LetterPreview({
  subject,
  body,
  mode,
  company,
  role,
  recipientEmail,
  error,
}: LetterPreviewProps) {
  const [copied, setCopied] = useState(false);
  const hasContent = body !== null;

  const heading =
    mode === "cold_email"
      ? subject
      : `Cover Letter — ${role || "Role"} at ${company || "Company"}`;

  const handleCopy = async () => {
    if (!body) return;
    const textToCopy =
      mode === "cold_email" && subject ? `Subject: ${subject}\n\n${body}` : body;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!body) return;
    const textToDownload =
      mode === "cold_email" && subject ? `Subject: ${subject}\n\n${body}` : body;

    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${mode === "cold_email" ? "cold-email" : "cover-letter"}-${(company || "draft").toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const mailtoLink =
    recipientEmail && body
      ? `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject || "")}&body=${encodeURIComponent(body)}`
      : null;

  return (
    <div className="relative">
      {/* Torn paper top edge */}
      <div className="torn-paper-top bg-paper rounded-xl p-6 md:p-8 shadow-lg min-h-[400px] flex flex-col">
        {/* Postmark stamp badge */}
        {hasContent && !error && (
          <div
            className="postmark absolute top-4 right-4 md:top-6 md:right-6 z-10"
            aria-label="Ready to send"
            id="postmark-badge"
          >
            ✦ READY
            <br />
            TO SEND ✦
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            className="flex-1 flex items-center justify-center"
            id="letter-error"
          >
            <div className="text-center max-w-sm">
              <div className="text-3xl mb-3" aria-hidden="true">
                ✕
              </div>
              <p className="text-stamp font-medium text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasContent && !error && (
          <div
            className="flex-1 flex items-center justify-center"
            id="letter-empty-state"
          >
            <div className="text-center max-w-xs">
              <div className="text-4xl mb-4 opacity-30" aria-hidden="true">
                ✉
              </div>
              <p className="text-ink-muted text-sm leading-relaxed">
                Fill in the form and generate your first draft — it&apos;ll
                appear here.
              </p>
            </div>
          </div>
        )}

        {/* Generated content */}
        {hasContent && !error && (
          <div className="flex-1 flex flex-col" id="letter-output">
            {/* Subject / Heading */}
            <h2
              className="font-serif text-xl md:text-2xl font-semibold text-ink mb-4 pr-28 leading-snug"
              id="letter-subject"
            >
              {heading}
            </h2>

            <div className="w-12 h-0.5 bg-paper-dim mb-5" aria-hidden="true" />

            {/* Body */}
            <div
              className="text-ink text-[0.925rem] leading-[1.7] whitespace-pre-wrap flex-1 mb-6 max-w-prose"
              id="letter-body"
            >
              {body}
            </div>

            {/* Action Row */}
            <div
              className="flex flex-wrap gap-2 pt-4 border-t border-paper-dim"
              id="letter-actions"
            >
              <button
                type="button"
                onClick={handleCopy}
                className="btn-action"
                id="copy-btn"
              >
                {copied ? (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    Copy
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="btn-action"
                id="download-btn"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download .txt
              </button>

              {mailtoLink ? (
                <a
                  href={mailtoLink}
                  className="btn-action no-underline"
                  id="mailto-btn"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Open in Mail App
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
