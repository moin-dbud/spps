/**
 * Institutional Translation Service
 * PM Shri Savitribai Phule School, Chandrapur
 *
 * Supports bidirectional translation between English (en), Marathi (mr), and Hindi (hi).
 * Providers:
 *  1. In-memory LRU cache + Institutional Glossary
 *  2. Gemini API (if GEMINI_API_KEY configured in environment)
 *  3. MyMemory Free Institutional Translation API (default zero-config provider)
 */

export type SupportedLang = "en" | "mr" | "hi";

interface TranslateOptions {
  text: string;
  sourceLang?: SupportedLang | "auto";
  targetLangs?: SupportedLang[];
  context?: "general" | "name" | "title" | "content";
}

interface TranslationResult {
  success: boolean;
  sourceLang: SupportedLang;
  translations: Record<SupportedLang, string>;
  provider: string;
  error?: string;
}

// In-memory cache: "from:to:text" -> translatedText
const translationCache = new Map<string, string>();
const MAX_CACHE_SIZE = 1000;

function setCache(from: string, to: string, text: string, result: string) {
  if (translationCache.size >= MAX_CACHE_SIZE) {
    const firstKey = translationCache.keys().next().value;
    if (firstKey) translationCache.delete(firstKey);
  }
  translationCache.set(`${from}:${to}:${text.trim().toLowerCase()}`, result);
}

function getCache(from: string, to: string, text: string): string | undefined {
  return translationCache.get(`${from}:${to}:${text.trim().toLowerCase()}`);
}

// Common Institutional Glossary for instant 0ms accurate translations
const GLOSSARY: Record<string, { en: string; mr: string; hi: string }> = {
  // Designations & Roles
  "headmaster": { en: "Headmaster", mr: "मुख्याध्यापक", hi: "प्रधानाध्यापक" },
  "principal": { en: "Principal", mr: "प्राचार्य", hi: "प्राचार्य" },
  "assistant teacher": { en: "Assistant Teacher", mr: "सहाय्यक शिक्षक", hi: "सहायक शिक्षक" },
  "senior teacher": { en: "Senior Teacher", mr: "वरिष्ठ शिक्षक", hi: "वरिष्ठ शिक्षक" },
  "mathematics teacher": { en: "Mathematics Teacher", mr: "गणित शिक्षक", hi: "गणित शिक्षक" },
  "science teacher": { en: "Science Teacher", mr: "विज्ञान शिक्षक", hi: "विज्ञान शिक्षक" },
  "computer science teacher": { en: "Computer Science Teacher", mr: "संगणक विज्ञान शिक्षक", hi: "कंप्यूटर विज्ञान शिक्षक" },
  "sports teacher": { en: "Sports Teacher", mr: "क्रीडा शिक्षक", hi: "खेल शिक्षक" },
  "physical education teacher": { en: "Physical Education Teacher", mr: "शारीरिक शिक्षण शिक्षक", hi: "शारीरिक शिक्षा शिक्षक" },
  "art teacher": { en: "Art Teacher", mr: "कला शिक्षक", hi: "कला शिक्षक" },
  "music teacher": { en: "Music Teacher", mr: "संगीत शिक्षक", hi: "संगीत शिक्षक" },
  "language teacher": { en: "Language Teacher", mr: "भाषा शिक्षक", hi: "भाषा शिक्षक" },
  "librarian": { en: "Librarian", mr: "ग्रंथपाल", hi: "पुस्तकालयाध्यक्ष" },
  "clerk": { en: "Clerk", mr: "लिपिक", hi: "लिपिक" },

  // School Departments
  "primary education": { en: "Primary Education", mr: "प्राथमिक शिक्षण", hi: "प्राथमिक शिक्षा" },
  "secondary education": { en: "Secondary Education", mr: "माध्यमिक शिक्षण", hi: "माध्यमिक शिक्षा" },
  "mathematics & science": { en: "Mathematics & Science", mr: "गणित व विज्ञान", hi: "गणित और विज्ञान" },
  "digital & computer science": { en: "Digital & Computer Science", mr: "डिजिटल व संगणक विज्ञान", hi: "डिजिटल और कंप्यूटर विज्ञान" },

  // Categories & Content Types
  "notice": { en: "Notice", mr: "सूचना", hi: "सूचना" },
  "news": { en: "News", mr: "बातमी", hi: "समाचार" },
  "event": { en: "Event", mr: "कार्यक्रम", hi: "कार्यक्रम" },
  "press": { en: "Press Coverage", mr: "वृत्तपत्र प्रसिद्धी", hi: "समाचार कवरेज" },
  "update": { en: "Update", mr: "अपडेट", hi: "अपडेट" },
  "school development program": { en: "School Development Program", mr: "शालेय विकास कार्यक्रम", hi: "विद्यालय विकास कार्यक्रम" },

  // School Identity
  "chandrapur municipal corporation": { en: "Chandrapur Municipal Corporation", mr: "चंद्रपूर महानगरपालिका", hi: "चंद्रपुर नगर निगम" },
  "savitribai phule": { en: "Savitribai Phule", mr: "सावित्रीबाई फुले", hi: "सावित्रीबाई फुले" },
};

// Check if phrase matches glossary in any language
function checkGlossary(text: string, from: SupportedLang, to: SupportedLang): string | null {
  const norm = text.trim().toLowerCase();
  for (const entry of Object.values(GLOSSARY)) {
    if (entry[from].toLowerCase() === norm) {
      return entry[to];
    }
  }
  return null;
}

/**
 * Detect language based on script and vocabulary
 */
export function detectLanguage(text: string): SupportedLang {
  const trimmed = text.trim();
  if (!trimmed) return "en";

  // Check for Devanagari script: Unicode \u0900 - \u097F
  const hasDevanagari = /[\u0900-\u097F]/.test(trimmed);
  if (!hasDevanagari) {
    return "en";
  }

  // Distinguish Marathi vs Hindi within Devanagari
  // 1. Marathi unique characters: ळ (\u0933)
  if (/[\u0933]/.test(trimmed)) {
    return "mr";
  }

  // Split text into tokens for accurate whole-word matching
  const tokens = new Set(trimmed.split(/[\s,।!?.]+/));

  // 2. Marathi grammatical keywords & markers
  const marathiWords = ["आहे", "नाही", "मध्ये", "शाळा", "शिक्षक", "मुख्याध्यापक", "चंद्रपूर", "सौ", "विद्यार्थी", "करणे", "झाले", "केले", "आणि", "शालेय", "स्पर्धा", "दिनांक", "पावती"];
  if (marathiWords.some((w) => tokens.has(w))) {
    return "mr";
  }

  // 3. Hindi grammatical keywords & markers
  const hindiWords = ["है", "में", "नहीं", "और", "विद्यालय", "चंद्रपुर", "श्रीमती", "छात्र", "करना", "हुआ", "किया", "एवं", "स्कूल", "दिनांक"];
  if (hindiWords.some((w) => tokens.has(w))) {
    return "hi";
  }

  // Default Devanagari fallback: in Maharashtra, default to Marathi
  return "mr";
}

/**
 * Call MyMemory Free Translation API
 */
async function translateWithMyMemory(text: string, from: SupportedLang, to: SupportedLang): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}&de=contact@spps-chandrapur.org`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`MyMemory HTTP error ${res.status}`);
    }

    const data: any = await res.json();
    if (data?.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      // Handle MyMemory error messages encoded in response
      if (translated.startsWith("MYMEMORY WARNING:") || translated.startsWith("PLEASE SELECT TWO DISTINCT LANGUAGES")) {
        throw new Error(translated);
      }
      return translated;
    }
    throw new Error("No translation returned by provider");
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Call Gemini API if GEMINI_API_KEY is configured
 */
async function translateWithGemini(
  text: string,
  from: SupportedLang,
  to: SupportedLang,
  apiKey: string,
  context?: string
): Promise<string> {
  const langNames: Record<SupportedLang, string> = {
    en: "English",
    mr: "Marathi",
    hi: "Hindi",
  };

  const prompt = `You are an official translator for PM Shri Savitribai Phule School in Chandrapur, Maharashtra.
Translate the following ${langNames[from]} text into natural, formal ${langNames[to]}.
Context: ${context || "School administrative publication"}.
Rules:
1. Preserve proper nouns and teacher names using authentic Maharashtrian transliteration where appropriate.
2. Preserve numbers, dates, punctuation, and markdown/paragraph structure exactly.
3. Return ONLY the translated text without explanations, quotation marks, or notes.

Text to translate:
${text}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini HTTP error ${res.status}`);
    }

    const data: any = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidate) {
      return candidate.trim();
    }
    throw new Error("Gemini returned empty candidate");
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Core translation function between any two supported languages
 */
export async function translateSingle(
  text: string,
  from: SupportedLang,
  to: SupportedLang,
  context?: string
): Promise<{ text: string; provider: string }> {
  if (from === to || !text.trim()) {
    return { text, provider: "identity" };
  }

  // 1. Check cache
  const cached = getCache(from, to, text);
  if (cached) {
    return { text: cached, provider: "cache" };
  }

  // 2. Check glossary
  const glossaryMatch = checkGlossary(text, from, to);
  if (glossaryMatch) {
    setCache(from, to, text, glossaryMatch);
    return { text: glossaryMatch, provider: "glossary" };
  }

  // 3. Check Gemini API if key is available
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const translated = await translateWithGemini(text, from, to, geminiKey, context);
      setCache(from, to, text, translated);
      return { text: translated, provider: "gemini" };
    } catch (e: any) {
      console.warn("[Translation] Gemini failed, falling back to MyMemory:", e.message);
    }
  }

  // 4. Default Provider: MyMemory
  const translated = await translateWithMyMemory(text, from, to);
  setCache(from, to, text, translated);
  return { text: translated, provider: "mymemory" };
}

/**
 * Main Translate Batch for Multilingual Auto-Translation
 * Given input text in one language, translates to the other two supported languages.
 */
export async function autoTranslateAll(options: TranslateOptions): Promise<TranslationResult> {
  const { text, sourceLang = "auto", context = "general" } = options;

  if (!text || !text.trim()) {
    return {
      success: true,
      sourceLang: "en",
      translations: { en: "", mr: "", hi: "" },
      provider: "none",
    };
  }

  // Detect source language if "auto"
  const detectedSource: SupportedLang =
    sourceLang === "auto" ? detectLanguage(text) : sourceLang;

  const allLangs: SupportedLang[] = ["en", "mr", "hi"];
  const targetLangs: SupportedLang[] = options.targetLangs
    ? options.targetLangs.filter((l) => l !== detectedSource)
    : allLangs.filter((l) => l !== detectedSource);

  const results: Record<SupportedLang, string> = {
    en: detectedSource === "en" ? text : "",
    mr: detectedSource === "mr" ? text : "",
    hi: detectedSource === "hi" ? text : "",
  };

  let primaryProvider = "institutional";
  let hasErrors = false;
  let lastError = "";

  // Perform translation to target languages in parallel
  await Promise.all(
    targetLangs.map(async (target) => {
      try {
        const { text: translated, provider } = await translateSingle(
          text,
          detectedSource,
          target,
          context
        );
        results[target] = translated;
        primaryProvider = provider;
      } catch (err: any) {
        hasErrors = true;
        lastError = err.message || "Translation error";
        console.error(`[Translation] Failed ${detectedSource}->${target}:`, err);
      }
    })
  );

  return {
    success: !hasErrors || Object.values(results).some((v) => v && v !== text),
    sourceLang: detectedSource,
    translations: results,
    provider: primaryProvider,
    error: hasErrors ? lastError : undefined,
  };
}
