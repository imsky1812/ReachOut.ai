"use client";

import React, { useState } from "react";

interface FormData {
  mode: "cold_email" | "cover_letter";
  company: string;
  role: string;
  jobDescription: string;
  background: string;
  tone: string;
}

interface GeneratorFormProps {
  onGenerate: (data: FormData) => void;
  isGenerating: boolean;
  recipientEmail: string;
  setRecipientEmail: (email: string) => void;
}

export default function GeneratorForm({
  onGenerate,
  isGenerating,
  recipientEmail,
  setRecipientEmail,
}: GeneratorFormProps) {
  const [mode, setMode] = useState<"cold_email" | "cover_letter">(
    "cold_email"
  );
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [background, setBackground] = useState("");
  const [tone, setTone] = useState("Professional");

  const [isFindingEmail, setIsFindingEmail] = useState(false);
  const [emailNote, setEmailNote] = useState<string | null>(null);
  const [emailFound, setEmailFound] = useState(false);

  const canGenerate =
    company.trim() !== "" &&
    role.trim() !== "" &&
    background.trim() !== "" &&
    !isGenerating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canGenerate) return;
    onGenerate({ mode, company, role, jobDescription, background, tone });
  };

  const handleFindEmail = async () => {
    if (!company.trim()) return;
    setIsFindingEmail(true);
    setEmailNote(null);
    setEmailFound(false);

    try {
      const res = await fetch("/api/find-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: company.trim() }),
      });

      const data = await res.json();

      if (data.email) {
        setRecipientEmail(data.email);
        setEmailFound(true);
        setEmailNote(data.note || "Found via web search — please verify.");
      } else {
        setEmailNote(
          data.note || "Couldn't find a public email — enter one manually."
        );
        setEmailFound(false);
      }
    } catch {
      setEmailNote("Search failed — you can enter an email manually.");
      setEmailFound(false);
    } finally {
      setIsFindingEmail(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-paper rounded-xl p-6 md:p-8 shadow-lg"
      id="generator-form"
    >
      {/* Mode Toggle */}
      <div className="mb-6">
        <label className="label-typewriter" id="mode-label">
          Type
        </label>
        <div
          className="segmented-control"
          role="group"
          aria-labelledby="mode-label"
        >
          <button
            type="button"
            data-active={mode === "cold_email" ? "true" : "false"}
            onClick={() => setMode("cold_email")}
            id="mode-cold-email"
          >
            Cold Email
          </button>
          <button
            type="button"
            data-active={mode === "cover_letter" ? "true" : "false"}
            onClick={() => setMode("cover_letter")}
            id="mode-cover-letter"
          >
            Cover Letter
          </button>
        </div>
      </div>

      {/* Company */}
      <div className="mb-4">
        <label htmlFor="company-input" className="label-typewriter">
          Company
        </label>
        <input
          id="company-input"
          type="text"
          className="form-input"
          placeholder="e.g. Stripe"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      {/* Role */}
      <div className="mb-4">
        <label htmlFor="role-input" className="label-typewriter">
          Role / Position
        </label>
        <input
          id="role-input"
          type="text"
          className="form-input"
          placeholder="e.g. Senior Frontend Engineer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <label htmlFor="jd-input" className="label-typewriter">
          Job Description
        </label>
        <textarea
          id="jd-input"
          className="form-input"
          rows={3}
          placeholder="Paste the job posting to tailor keywords — optional but helps."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{ resize: "vertical", minHeight: "70px" }}
        />
      </div>

      {/* Background */}
      <div className="mb-4">
        <label htmlFor="background-input" className="label-typewriter">
          Your Background
        </label>
        <textarea
          id="background-input"
          className="form-input"
          rows={4}
          placeholder="A few lines on your skills, projects, or experience relevant to this role."
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          required
          style={{ resize: "vertical", minHeight: "90px" }}
        />
      </div>

      {/* Tone */}
      <div className="mb-5">
        <label htmlFor="tone-select" className="label-typewriter">
          Tone
        </label>
        <select
          id="tone-select"
          className="form-select"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="Professional">Professional</option>
          <option value="Friendly">Friendly</option>
          <option value="Confident">Confident</option>
          <option value="Concise">Concise</option>
        </select>
      </div>

      {/* Recipient Email */}
      <div className="mb-6">
        <label htmlFor="recipient-email" className="label-typewriter">
          To (Recipient Email)
        </label>
        <div className="flex gap-2">
          <input
            id="recipient-email"
            type="email"
            className="form-input flex-1"
            placeholder="hr@company.com"
            value={recipientEmail}
            onChange={(e) => {
              setRecipientEmail(e.target.value);
              setEmailNote(null);
              setEmailFound(false);
            }}
          />
          <button
            type="button"
            onClick={handleFindEmail}
            disabled={!company.trim() || isFindingEmail}
            className="btn-action whitespace-nowrap"
            id="find-email-btn"
          >
            {isFindingEmail ? (
              <>
                <span className="spinner-dark" aria-hidden="true" />
                Searching…
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Find HR Email
              </>
            )}
          </button>
        </div>
        {emailNote && (
          <p
            className={`mt-1.5 text-xs ${
              emailFound ? "text-found" : "text-ink-muted"
            }`}
            id="email-note"
          >
            {emailFound && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block mr-1 -mt-0.5"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
            {emailNote}
          </p>
        )}
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={!canGenerate}
        className="btn-stamp w-full text-center"
        id="generate-btn"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="spinner" aria-hidden="true" />
            Generating…
          </span>
        ) : (
          `Generate ${mode === "cold_email" ? "Cold Email" : "Cover Letter"}`
        )}
      </button>
    </form>
  );
}
