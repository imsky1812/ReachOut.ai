"use client";

import React, { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import LetterPreview from "@/components/LetterPreview";
import Footer from "@/components/Footer";

interface FormData {
  mode: "cold_email" | "cover_letter";
  company: string;
  role: string;
  jobDescription: string;
  background: string;
  tone: string;
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSubject, setGeneratedSubject] = useState<string | null>(null);
  const [generatedBody, setGeneratedBody] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [currentMode, setCurrentMode] = useState<"cold_email" | "cover_letter">(
    "cold_email"
  );
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  const handleGenerate = async (data: FormData) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedSubject(null);
    setGeneratedBody(null);
    setCurrentMode(data.mode);
    setCurrentCompany(data.company);
    setCurrentRole(data.role);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        setError(
          result.error ||
            "Groq couldn't generate a draft — check your API key in Vercel's environment variables and try again."
        );
        return;
      }

      setGeneratedSubject(result.subject || null);
      setGeneratedBody(result.body || null);
    } catch {
      setError(
        "Failed to reach the server. Please check your connection and try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-ink-deep-2 px-4 md:px-8 py-4" id="site-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <h1
            className="font-serif text-xl font-bold text-paper tracking-tight"
            id="brand-name"
          >
            ReachOut
          </h1>
          <p className="text-paper/50 text-sm" id="brand-tagline">
            Cold emails and cover letters, written and addressed for you.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-8 md:py-12" id="main-content">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-6 lg:gap-8 items-start">
            {/* Left: Form */}
            <div>
              <GeneratorForm
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                recipientEmail={recipientEmail}
                setRecipientEmail={setRecipientEmail}
              />
            </div>

            {/* Right: Preview */}
            <div>
              <LetterPreview
                subject={generatedSubject}
                body={generatedBody}
                mode={currentMode}
                company={currentCompany}
                role={currentRole}
                recipientEmail={recipientEmail}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
