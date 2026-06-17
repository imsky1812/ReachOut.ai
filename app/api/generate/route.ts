import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface GenerateRequestBody {
  mode: "cold_email" | "cover_letter";
  company: string;
  role: string;
  jobDescription?: string;
  background: string;
  tone: string;
}

export async function POST(request: NextRequest) {
  let body: GenerateRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const { mode, company, role, jobDescription, background, tone } = body;

  // Server-side validation
  if (!company || !role || !background || !mode || !tone) {
    return NextResponse.json(
      {
        error:
          "Missing required fields. Please provide mode, company, role, background, and tone.",
      },
      { status: 400 }
    );
  }

  // Read API key inside handler, never at module top level
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Groq API key is not configured. Add GROQ_API_KEY to your environment variables in Vercel's Project Settings.",
      },
      { status: 500 }
    );
  }

  const modeLabel =
    mode === "cold_email" ? "cold outreach email" : "cover letter";
  const jobContext = jobDescription
    ? `\n\nJob description for reference (use specific keywords and requirements from this):\n${jobDescription}`
    : "";

  const systemPrompt = `You are an expert career communication writer. Write a sharp, specific, and tailored ${modeLabel} for someone applying to ${company} for the role of ${role}.

Tone: ${tone}

The draft MUST:
- Be 180–260 words for the body
- Be grounded ONLY in the applicant's provided background — never invent qualifications or experiences
- Reference the specific company and role naturally
- Avoid generic filler phrases like "I am writing to express my interest" or "I believe I would be a great fit"
- Sound human, not templated
- Structure the body into 2–3 clear paragraphs separated by blank lines (use \\n\\n between paragraphs)
- For cold emails: be direct, concise, and compelling — the subject line should be specific and attention-grabbing
- For cover letters: follow standard cover letter structure but keep it concise and impactful
- End the body with a sign-off block: after the last paragraph, add two blank lines, then "[Your Name]" on its own line, and "[Your Profession]" on the next line

${mode === "cold_email" ? 'Respond with ONLY a JSON object: {"subject": "...", "body": "..."}' : 'Respond with ONLY a JSON object: {"subject": "Cover Letter — ' + role + " at " + company + '", "body": "..."}'}

No markdown fences, no commentary, no explanation — just the raw JSON object.`;

  const userMessage = `Applicant's background:
${background}${jobContext}

Write the ${modeLabel} now.`;

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errorText);
      return NextResponse.json(
        {
          error: `Groq API returned status ${groqResponse.status}. Check your API key and try again.`,
        },
        { status: groqResponse.status }
      );
    }

    const data = await groqResponse.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim() ?? "";

    if (!rawContent) {
      return NextResponse.json(
        { error: "Groq returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    // Defensive JSON parsing: strip code fences if present
    let parsed: { subject: string; body: string };

    try {
      const cleaned = rawContent
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      parsed = JSON.parse(cleaned);

      if (!parsed.subject || !parsed.body) {
        throw new Error("Missing subject or body in parsed JSON");
      }
    } catch {
      // Fallback: return raw text as body with a sensible default subject
      const defaultSubject =
        mode === "cold_email"
          ? `Re: ${role} opportunity at ${company}`
          : `Cover Letter — ${role} at ${company}`;

      parsed = {
        subject: defaultSubject,
        body: rawContent,
      };
    }

    return NextResponse.json({
      subject: parsed.subject,
      body: parsed.body,
    });
  } catch (err) {
    console.error("Generate API error:", err);
    return NextResponse.json(
      {
        error:
          "Failed to connect to Groq. Please check your internet connection and try again.",
      },
      { status: 500 }
    );
  }
}
