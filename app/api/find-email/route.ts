import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const runtime = "nodejs";

const PERSONAL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "live.com",
  "msn.com",
  "ymail.com",
  "googlemail.com",
];

const HR_PREFIXES = [
  "hr",
  "careers",
  "jobs",
  "talent",
  "recruiting",
  "recruitment",
  "people",
  "hiring",
  "apply",
  "career",
];

function extractEmails(text: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex) || [];
  return [...new Set(matches.map((e) => e.toLowerCase()))];
}

function isPersonalEmail(email: string): boolean {
  const domain = email.split("@")[1];
  return PERSONAL_DOMAINS.includes(domain);
}

function isHRLikeEmail(email: string): boolean {
  const localPart = email.split("@")[0].toLowerCase();
  return HR_PREFIXES.some(
    (prefix) => localPart === prefix || localPart.startsWith(prefix + ".")
  );
}

async function searchDuckDuckGo(query: string): Promise<string> {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (!response.ok) {
    throw new Error(`DuckDuckGo returned status ${response.status}`);
  }

  return await response.text();
}

function parseSearchResults(html: string): string {
  const $ = cheerio.load(html);
  const texts: string[] = [];

  // Extract text from result titles and snippets
  $(".result__title, .result__snippet, .result__url").each((_, el) => {
    texts.push($(el).text());
  });

  // Also check links
  $("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    texts.push(href);
    texts.push($(el).text());
  });

  return texts.join(" ");
}

export async function POST(request: NextRequest) {
  let body: { company: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { email: null, note: "Invalid request." },
      { status: 400 }
    );
  }

  const { company } = body;

  if (!company || company.trim().length === 0) {
    return NextResponse.json(
      { email: null, note: "Company name is required." },
      { status: 400 }
    );
  }

  try {
    const queries = [
      `"${company}" HR email contact`,
      `"${company}" careers contact email address`,
    ];

    let allEmails: string[] = [];

    for (const query of queries) {
      try {
        const html = await searchDuckDuckGo(query);
        const text = parseSearchResults(html);
        const emails = extractEmails(text);
        allEmails = allEmails.concat(emails);
      } catch (err) {
        console.error(`Search failed for query "${query}":`, err);
        // Continue with next query
      }
    }

    // Dedupe
    allEmails = [...new Set(allEmails)];

    // Filter out personal email providers
    const corporateEmails = allEmails.filter((e) => !isPersonalEmail(e));

    if (corporateEmails.length === 0) {
      return NextResponse.json({
        email: null,
        note: "Couldn't find a public HR email — you can enter one manually.",
      });
    }

    // Prefer HR-like emails
    const hrEmails = corporateEmails.filter(isHRLikeEmail);
    const candidates = hrEmails.length > 0 ? hrEmails : corporateEmails;

    // If only one candidate, use it
    if (candidates.length === 1) {
      return NextResponse.json({
        email: candidates[0],
        note: "Found via web search — please verify before sending.",
      });
    }

    // Multiple candidates — try Groq tiebreaker if API key is available
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey && candidates.length > 1) {
      try {
        const tiebreakResponse = await fetch(
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
                {
                  role: "system",
                  content:
                    "You help pick the most likely official HR or careers email from a list of candidates. Reply with ONLY the email address, or NONE if none look right. No explanation.",
                },
                {
                  role: "user",
                  content: `Company: ${company}\nCandidate emails: ${candidates.join(", ")}\n\nWhich one is most likely the official HR/careers email for ${company}?`,
                },
              ],
              temperature: 0,
              max_tokens: 100,
            }),
          }
        );

        if (tiebreakResponse.ok) {
          const data = await tiebreakResponse.json();
          const pick =
            data.choices?.[0]?.message?.content?.trim().toLowerCase() ?? "";

          if (pick !== "none" && candidates.includes(pick)) {
            return NextResponse.json({
              email: pick,
              note: "Found via web search — please verify before sending.",
            });
          }
        }
      } catch {
        // Tiebreaker failed, fall through to first candidate
      }
    }

    // Return the first HR-like candidate, or first corporate candidate
    return NextResponse.json({
      email: candidates[0],
      note: "Found via web search — please verify before sending.",
    });
  } catch (err) {
    console.error("Find-email API error:", err);
    return NextResponse.json({
      email: null,
      note: "Search encountered an error — you can enter an email manually.",
    });
  }
}
