import type { HTMLElement } from "node-html-parser";

export type ScoreFinding = {
  label: string;
  status: "pass" | "warn" | "fail" | "info";
  detail: string;
};

export type CategoryResult = {
  score: number;
  summary: string;
  findings: ScoreFinding[];
};

export type Recommendation = {
  priority: "high" | "medium" | "low";
  area:
    | "SEO"
    | "Relevance"
    | "Freshness"
    | "Readability"
    | "Design"
    | "Reachability"
    | "Conversion";
  title: string;
  action: string;
  /** Matching finding label for in-page anchors */
  findingLabel?: string;
};

export type AnalyzeResult = {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  title: string;
  focusTopic?: string;
  seo: CategoryResult;
  relevance: CategoryResult;
  freshness: CategoryResult;
  readability: CategoryResult;
  design: CategoryResult;
  reachability: CategoryResult;
  conversion: CategoryResult;
  overallScore: number;
  recommendations: Recommendation[];
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function metaContent(doc: HTMLElement, selectors: string[]): string {
  for (const selector of selectors) {
    const el = doc.querySelector(selector);
    const content =
      el?.getAttribute("content") ||
      el?.getAttribute("value") ||
      el?.text?.trim() ||
      "";
    if (content) return content.trim();
  }
  return "";
}

function textOf(el: HTMLElement | null | undefined) {
  return (el?.text || "").replace(/\s+/g, " ").trim();
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

const LOCATION_HINTS = new Set([
  "county",
  "michigan",
  "macomb",
  "warren",
  "detroit",
  "romeo",
  "near",
  "township",
]);

function extractLocationTokens(topic: string): string[] {
  const tokens = tokenize(topic);
  const found = new Set<string>();

  for (const token of tokens) {
    if (LOCATION_HINTS.has(token)) found.add(token);
  }

  const countyPhrases =
    topic.match(
      /\b([A-Za-z][A-Za-z'-]{3,}\s+(?:County|Township)|(?:City\s+of\s+)?[A-Za-z][A-Za-z'-]{3,}(?:\s+[A-Za-z][A-Za-z'-]{3,})?)\b/g,
    ) || [];
  for (const phrase of countyPhrases) {
    const lower = phrase.toLowerCase().replace(/\s+/g, " ").trim();
    if (
      /\b(county|township|michigan|macomb|warren|detroit|romeo)\b/.test(lower) ||
      /\bcity of\b/.test(lower)
    ) {
      found.add(lower);
      for (const part of tokenize(lower)) {
        if (part.length >= 4) found.add(part);
      }
    }
  }

  for (const token of tokens) {
    if (token.length >= 4 && LOCATION_HINTS.has(token)) {
      found.add(token);
    }
  }

  return Array.from(found);
}

export function analyzeSeo(
  html: string,
  doc: HTMLElement,
  pageUrl: URL,
): CategoryResult {
  const findings: ScoreFinding[] = [];
  let score = 100;

  const title = textOf(doc.querySelector("title"));
  const description = metaContent(doc, [
    'meta[name="description"]',
    'meta[property="og:description"]',
  ]);
  const canonical =
    doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
  const robots = metaContent(doc, ['meta[name="robots"]']).toLowerCase();
  const viewport = metaContent(doc, ['meta[name="viewport"]']);
  const ogTitle = metaContent(doc, ['meta[property="og:title"]']);
  const ogImage = metaContent(doc, ['meta[property="og:image"]']);
  const twitterCard = metaContent(doc, ['meta[name="twitter:card"]']);
  const h1s = doc.querySelectorAll("h1");
  const images = doc.querySelectorAll("img");
  const imagesMissingAlt = images.filter((img) => {
    const alt = img.getAttribute("alt");
    return alt == null || alt.trim() === "";
  }).length;
  const hasJsonLd = /application\/ld\+json/i.test(html);
  const lang = doc.querySelector("html")?.getAttribute("lang") || "";

  if (!title) {
    score -= 20;
    findings.push({
      label: "Title tag",
      status: "fail",
      detail:
        "Your page has no title tag. That's the blue clickable headline people see in Google — without it, search results look unfinished and fewer neighbors will click through to call you.",
    });
  } else if (title.length < 15 || title.length > 65) {
    score -= 8;
    findings.push({
      label: "Title tag",
      status: "warn",
      detail: `Your title is ${title.length} characters. Google often cuts titles that run long, and short ones waste the chance to name your service and town. Aim for roughly 15–60 characters so the full pitch shows.`,
    });
  } else {
    findings.push({
      label: "Title tag",
      status: "pass",
      detail: `Your search headline looks solid: “${title}”. That helps people instantly recognize who you are when they scan Google.`,
    });
  }

  if (!description) {
    score -= 16;
    findings.push({
      label: "Meta description",
      status: "fail",
      detail:
        "Your site doesn't have a meta description — that's the blurb Google shows under your link in search results. Right now Google is making one up for you, and it's probably not selling your business well.",
    });
  } else if (description.length < 50 || description.length > 170) {
    score -= 6;
    findings.push({
      label: "Meta description",
      status: "warn",
      detail: `Your meta description is ${description.length} characters. Too short and it feels incomplete; too long and Google chops it mid-sentence. Roughly 70–160 characters gives you room to mention the service, area, and why to call.`,
    });
  } else {
    findings.push({
      label: "Meta description",
      status: "pass",
      detail:
        "You've written a search blurb under your listing. That little paragraph is often what turns a search into a phone call.",
    });
  }

  if (h1s.length === 0) {
    score -= 14;
    findings.push({
      label: "H1 heading",
      status: "fail",
      detail:
        "There's no main headline (H1) on the page. Visitors and Google both look for one clear promise at the top — like “Emergency HVAC Repair in Warren” — so people know they're in the right place.",
    });
  } else if (h1s.length > 1) {
    score -= 6;
    findings.push({
      label: "H1 heading",
      status: "warn",
      detail: `We found ${h1s.length} main headlines. Multiple H1s can muddy the message. One strong headline up top usually converts better for a local shop.`,
    });
  } else {
    findings.push({
      label: "H1 heading",
      status: "pass",
      detail: `Clear main headline: “${textOf(h1s[0]) || "Present"}”. Visitors can tell what you do within a second of landing.`,
    });
  }

  if (!canonical) {
    score -= 5;
    findings.push({
      label: "Canonical",
      status: "warn",
      detail:
        "No preferred page URL is marked. If the same page is reachable with and without www or trailing slashes, Google can split your rankings across duplicates — which means weaker local visibility.",
    });
  } else {
    findings.push({
      label: "Canonical",
      status: "pass",
      detail:
        "You've told search engines which URL is the “real” version of this page, so ranking strength isn't diluted across lookalike links.",
    });
  }

  if (robots.includes("noindex")) {
    score -= 25;
    findings.push({
      label: "Robots",
      status: "fail",
      detail:
        "This page is marked so Google shouldn't list it. If this is a page you want customers to find — menu, services, contact — that setting is hiding you from search.",
    });
  } else {
    findings.push({
      label: "Robots",
      status: "pass",
      detail:
        robots ||
        "Nothing is blocking Google from listing this page. Customers searching for your services can still find you here.",
    });
  }

  if (!viewport) {
    score -= 8;
    findings.push({
      label: "Viewport",
      status: "warn",
      detail:
        "There's no mobile viewport setting. On phones — where most local searches happen — the page can look zoomed-out or broken, and people bounce before they call.",
    });
  } else {
    findings.push({
      label: "Viewport",
      status: "pass",
      detail:
        "The page is set up for phones. That's critical when someone Googles you from the driveway needing dinner reservations or a same-day repair.",
    });
  }

  if (!ogTitle || !ogImage) {
    score -= 6;
    findings.push({
      label: "Open Graph",
      status: "warn",
      detail:
        "When someone shares your link in texts, Facebook, or Messenger, the preview may look plain or pull a random image. A clear title and photo make shares look like a real business, not a broken link.",
    });
  } else {
    findings.push({
      label: "Open Graph",
      status: "pass",
      detail:
        "Shared links can show a proper title and image — so when a customer forwards your site to a spouse or friend, it looks polished.",
    });
  }

  if (!twitterCard) {
    score -= 3;
    findings.push({
      label: "Twitter card",
      status: "info",
      detail:
        "No X/Twitter preview card is set. Not a deal-breaker for most local businesses, but shares on X may look less intentional.",
    });
  }

  if (!hasJsonLd) {
    score -= 5;
    findings.push({
      label: "Structured data",
      status: "warn",
      detail:
        "We didn't find the behind-the-scenes business markup that helps Google show richer results (hours, address, ratings). Without it, you can miss the fancy listing details that make competitors look more trustworthy.",
    });
  } else {
    findings.push({
      label: "Structured data",
      status: "pass",
      detail:
        "Structured business info is present. That can help Google understand your hours, location, and services for local searches.",
    });
  }

  if (!lang) {
    score -= 4;
    findings.push({
      label: "HTML lang",
      status: "warn",
      detail:
        "The page doesn't declare its language. Small detail, but it helps browsers and search tools present your site correctly to English-speaking customers.",
    });
  }

  if (images.length > 0) {
    const ratio = imagesMissingAlt / images.length;
    if (ratio > 0.35) {
      score -= 10;
      findings.push({
        label: "Image alt text",
        status: "fail",
        detail: `${imagesMissingAlt} of ${images.length} photos have no description. That hurts accessibility and wastes a chance to mention dishes, trucks, or job photos in words Google can read.`,
      });
    } else if (imagesMissingAlt > 0) {
      score -= 5;
      findings.push({
        label: "Image alt text",
        status: "warn",
        detail: `${imagesMissingAlt} of ${images.length} images are missing descriptions. Fill those in so every photo helps sell the business, not just decorate the page.`,
      });
    } else {
      findings.push({
        label: "Image alt text",
        status: "pass",
        detail: `All ${images.length} images have descriptions — good for accessibility and for search engines that can't “see” your photos.`,
      });
    }
  }

  findings.push({
    label: "Analyzed URL",
    status: "info",
    detail: `We reviewed this page: ${pageUrl.toString()}`,
  });

  const finalScore = clampScore(score);
  return {
    score: finalScore,
    summary:
      finalScore >= 80
        ? "Your search basics look strong — Google has what it needs to list you clearly."
        : finalScore >= 60
          ? "Search foundations are okay, but a few gaps are costing you clicks from local customers."
          : "On-page search issues are likely hiding your business from people looking for what you offer.",
    findings,
  };
}

export function analyzeRelevance(
  doc: HTMLElement,
  topic?: string,
): CategoryResult {
  const findings: ScoreFinding[] = [];
  let score = 55;

  const title = textOf(doc.querySelector("title"));
  const description = metaContent(doc, [
    'meta[name="description"]',
    'meta[property="og:description"]',
  ]);
  const h1 = textOf(doc.querySelector("h1"));
  const h2s = doc
    .querySelectorAll("h2")
    .map((el) => textOf(el))
    .filter(Boolean);
  const paragraphs = doc
    .querySelectorAll("p")
    .map((el) => textOf(el))
    .filter((text) => text.length > 40);
  const bodyText = [
    title,
    description,
    h1,
    ...h2s.slice(0, 12),
    ...paragraphs.slice(0, 40),
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const haystack = bodyText.toLowerCase();

  const wordCount = tokenize(bodyText).length;
  if (wordCount >= 400) {
    score += 18;
    findings.push({
      label: "Content depth",
      status: "pass",
      detail: `You've got roughly ${wordCount} words of real content. That gives customers enough detail to trust you — services, area, what to expect — instead of a thin “coming soon” feel.`,
    });
  } else if (wordCount >= 180) {
    score += 8;
    findings.push({
      label: "Content depth",
      status: "warn",
      detail: `About ${wordCount} words of copy. That's a start, but competitors who spell out menus, service areas, or what a visit includes usually win the “should I call them?” moment.`,
    });
  } else {
    score -= 12;
    findings.push({
      label: "Content depth",
      status: "fail",
      detail: `Only about ${wordCount} words showed up. Thin pages make it hard for Google — and for customers — to know if you fix furnaces in their town or serve the food they're craving.`,
    });
  }

  if (h2s.length >= 2) {
    score += 8;
    findings.push({
      label: "Topic structure",
      status: "pass",
      detail: `${h2s.length} section headings help people skim for hours, services, or “how it works” without reading every word.`,
    });
  } else {
    score -= 4;
    findings.push({
      label: "Topic structure",
      status: "warn",
      detail:
        "Few section headings. Busy customers on their phone will scroll past a wall of text — break the page into clear chunks like Services, Areas We Serve, and Contact.",
    });
  }

  const focus = (topic || `${title} ${h1}`).trim();
  const focusTokens = Array.from(new Set(tokenize(focus))).slice(0, 8);

  if (topic) {
    const locationTokens = extractLocationTokens(topic);
    const missingLocations = locationTokens.filter(
      (token) => !haystack.includes(token.toLowerCase()),
    );

    for (const missing of missingLocations.slice(0, 4)) {
      score -= 6;
      findings.push({
        label: "Location match",
        status: "fail",
        detail: `For "${topic}" searches, your page never mentions "${missing}". Local customers type those place names into Google — if your site doesn't say them, you look like you might not serve their area.`,
      });
    }

    if (locationTokens.length > 0 && missingLocations.length === 0) {
      score += 8;
      findings.push({
        label: "Location match",
        status: "pass",
        detail: `Your page mentions the local place names from “${topic}”. That reassures nearby customers you're actually in their market.`,
      });
    }

    const matched = focusTokens.filter((token) => haystack.includes(token));
    const coverage = focusTokens.length
      ? matched.length / focusTokens.length
      : 0;

    if (coverage >= 0.7) {
      score += 18;
      findings.push({
        label: "Topic match",
        status: "pass",
        detail: `Strong match for “${topic}”. Your page naturally covers the words people use when they're looking for that exact service or meal — so you feel like the right click.`,
      });
    } else if (coverage >= 0.35) {
      score += 6;
      findings.push({
        label: "Topic match",
        status: "warn",
        detail: `Partial match for “${topic}”. Some of the key ideas show up, but the page doesn't consistently talk about what someone searching that phrase expects to see.`,
      });
    } else {
      score -= 14;
      findings.push({
        label: "Topic match",
        status: "fail",
        detail: `Weak match for “${topic}”. If a customer searched that and landed here, they may bounce because the page doesn't clearly promise what they asked for.`,
      });
    }
  } else {
    findings.push({
      label: "Topic match",
      status: "info",
      detail:
        "No focus topic was provided, so we scored based on how substantial and organized the page is. Add a topic like “pizza delivery Warren MI” for a tighter local match score.",
    });
    if (title && h1 && title.toLowerCase().includes(tokenize(h1)[0] || "___")) {
      score += 6;
    }
  }

  const titleTokens = new Set(tokenize(title));
  const h1Tokens = new Set(tokenize(h1));
  const shared = [...titleTokens].filter((token) => h1Tokens.has(token));
  if (title && h1 && shared.length > 0) {
    score += 6;
    findings.push({
      label: "Title / H1 alignment",
      status: "pass",
      detail:
        "Your browser/search title and the big headline on the page push the same message — less confusion for visitors deciding if they're in the right place.",
    });
  } else if (title && h1) {
    score -= 5;
    findings.push({
      label: "Title / H1 alignment",
      status: "warn",
      detail:
        "The search title and the on-page headline don't clearly say the same thing. That mixed signal can make people wonder if they clicked the wrong business.",
    });
  }

  const finalScore = clampScore(score);
  return {
    score: finalScore,
    summary:
      finalScore >= 80
        ? "The page clearly talks about what local customers are searching for."
        : finalScore >= 60
          ? "Relevance is fair — tighten the topic and place names so searchers feel instantly understood."
          : "The page looks thin or off-topic for the searches you care about.",
    findings,
  };
}

function parseDateCandidate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const asNumber = Number(trimmed);
  if (!Number.isNaN(asNumber) && asNumber > 1_000_000_000) {
    const ms = asNumber < 1_000_000_000_000 ? asNumber * 1000 : asNumber;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(trimmed);
  if (!Number.isNaN(date.getTime())) return date;

  const match = trimmed.match(
    /(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})|([A-Z][a-z]{2,9}\s+\d{1,2},?\s+\d{4})/,
  );
  if (match) {
    const parsed = new Date(match[0]);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  return null;
}

export function analyzeFreshness(
  html: string,
  doc: HTMLElement,
  headers: Headers,
): CategoryResult {
  const findings: ScoreFinding[] = [];
  const candidates: Array<{ source: string; date: Date }> = [];

  const headerLastModified = headers.get("last-modified");
  if (headerLastModified) {
    const date = parseDateCandidate(headerLastModified);
    if (date) candidates.push({ source: "server last-modified date", date });
  }

  const metaSelectors = [
    'meta[property="article:modified_time"]',
    'meta[property="og:updated_time"]',
    'meta[name="last-modified"]',
    'meta[name="revised"]',
    'meta[property="article:published_time"]',
    'meta[name="date"]',
    'meta[itemprop="dateModified"]',
    'meta[itemprop="datePublished"]',
  ];

  for (const selector of metaSelectors) {
    const value = metaContent(doc, [selector]);
    const date = parseDateCandidate(value);
    if (date) {
      candidates.push({ source: "page update metadata", date });
    }
  }

  const timeEls = doc.querySelectorAll("time");
  for (const el of timeEls.slice(0, 10)) {
    const value = el.getAttribute("datetime") || textOf(el);
    const date = parseDateCandidate(value);
    if (date) candidates.push({ source: "visible date on the page", date });
  }

  const jsonLdDates =
    html.match(
      /"(dateModified|datePublished|uploadDate)"\s*:\s*"([^"]+)"/gi,
    ) || [];
  for (const entry of jsonLdDates.slice(0, 10)) {
    const match = entry.match(/:\s*"([^"]+)"/);
    if (!match) continue;
    const date = parseDateCandidate(match[1]);
    if (date) candidates.push({ source: "business listing date fields", date });
  }

  const copyrightYear = html.match(/©\s*((?:19|20)\d{2})/);
  if (copyrightYear) {
    const date = new Date(`${copyrightYear[1]}-12-31T00:00:00Z`);
    candidates.push({ source: "copyright year", date });
  }

  const now = Date.now();
  const valid = candidates
    .filter((item) => item.date.getTime() <= now + 86_400_000)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (valid.length === 0) {
    return {
      score: 35,
      summary:
        "We couldn't verify when this was last updated — adding a visible date (blog post, specials, news) helps reassure visitors you're active.",
      findings: [
        {
          label: "Last updated",
          status: "warn",
          detail:
            "We didn't find a way to confirm freshness. This doesn't mean the site is outdated, but showing one (last blog post, current season's specials, this year's copyright) removes the doubt for visitors deciding whether to call.",
        },
      ],
    };
  }

  const newest = valid[0];
  const ageDays = Math.max(
    0,
    Math.floor((now - newest.date.getTime()) / 86_400_000),
  );

  let score = 90;
  let status: ScoreFinding["status"] = "pass";
  let summary = "The page shows recent signs of being maintained.";

  if (ageDays <= 30) {
    score = 95;
    summary = "Updated within the last month — feels current and trustworthy.";
  } else if (ageDays <= 90) {
    score = 82;
    summary = "Updated within the last few months — still looks actively run.";
  } else if (ageDays <= 180) {
    score = 68;
    status = "warn";
    summary = "Last clear update was several months ago.";
  } else if (ageDays <= 365) {
    score = 52;
    status = "warn";
    summary = "Likely not refreshed in close to a year.";
  } else {
    score = 28;
    status = "fail";
    summary = "Looks stale — last detected update is over a year ago.";
  }

  findings.push({
    label: "Best update signal",
    status,
    detail:
      ageDays <= 90
        ? `Newest date we found is ${newest.date.toISOString().slice(0, 10)} (${ageDays} day${ageDays === 1 ? "" : "s"} ago via ${newest.source}). Fresh dates reassure customers the menu, hours, or service area are still real.`
        : ageDays <= 365
          ? `Newest date we found is ${newest.date.toISOString().slice(0, 10)} — about ${ageDays} days ago (${newest.source}). Customers may question whether hours, pricing, or promotions are still accurate.`
          : `Newest date we found is ${newest.date.toISOString().slice(0, 10)} — over a year ago (${newest.source}). That “ghost town” feel costs calls; refresh photos, hours, and offers and show a current date.`,
  });

  for (const item of valid.slice(1, 4)) {
    findings.push({
      label: "Other date signal",
      status: "info",
      detail: `Also saw ${item.date.toISOString().slice(0, 10)} from ${item.source}.`,
    });
  }

  return {
    score: clampScore(score),
    summary,
    findings,
  };
}

function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleaned) return 0;
  if (cleaned.length <= 3) return 1;
  const groups = cleaned
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g);
  return groups?.length || 1;
}

export function analyzeReadability(doc: HTMLElement): CategoryResult {
  const findings: ScoreFinding[] = [];
  let score = 70;

  const paragraphs = doc
    .querySelectorAll("p")
    .map((el) => textOf(el))
    .filter((text) => text.length > 25);
  const listItems = doc.querySelectorAll("li").length;
  const bodyText = paragraphs.join(" ").replace(/\s+/g, " ").trim();
  const sentences = bodyText
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 8);
  const words = tokenize(bodyText);
  const longWords = words.filter((word) => word.length >= 12).length;
  const avgSentenceWords =
    sentences.length > 0 ? words.length / sentences.length : 0;
  const avgParagraphWords =
    paragraphs.length > 0
      ? paragraphs.reduce((sum, p) => sum + tokenize(p).length, 0) /
        paragraphs.length
      : 0;

  const syllableCount = words.reduce(
    (sum, word) => sum + countSyllables(word),
    0,
  );
  const flesch =
    words.length > 0 && sentences.length > 0
      ? 206.835 -
        1.015 * (words.length / sentences.length) -
        84.6 * (syllableCount / words.length)
      : 0;

  if (words.length < 40) {
    score -= 15;
    findings.push({
      label: "Sample size",
      status: "warn",
      detail:
        "There isn't enough paragraph text to judge how easy the copy is to read. Thin pages also leave customers with unanswered questions about what you offer.",
    });
  } else if (flesch >= 60) {
    score += 15;
    findings.push({
      label: "Reading ease",
      status: "pass",
      detail: `The writing looks easy to skim (reading-ease around ${Math.round(flesch)}). Busy customers can grasp your offer without decoding jargon.`,
    });
  } else if (flesch >= 45) {
    score += 4;
    findings.push({
      label: "Reading ease",
      status: "warn",
      detail: `The copy is a bit dense (reading-ease around ${Math.round(flesch)}). On a phone after work, people bounce when every sentence feels like homework.`,
    });
  } else {
    score -= 14;
    findings.push({
      label: "Reading ease",
      status: "fail",
      detail: `The writing is hard to digest (reading-ease around ${Math.round(flesch)}). Shorten sentences and say it like you'd explain it to a neighbor — “same-day AC repair,” not a brochure paragraph.`,
    });
  }

  if (avgSentenceWords > 0 && avgSentenceWords <= 20) {
    score += 8;
    findings.push({
      label: "Sentence length",
      status: "pass",
      detail: `Sentences average about ${Math.round(avgSentenceWords)} words — short enough that people can decide quickly whether to call.`,
    });
  } else if (avgSentenceWords <= 28) {
    score -= 2;
    findings.push({
      label: "Sentence length",
      status: "warn",
      detail: `Sentences average about ${Math.round(avgSentenceWords)} words. Trimming toward 15–20 words keeps tired customers reading instead of skimming past your offer.`,
    });
  } else if (avgSentenceWords > 28) {
    score -= 12;
    findings.push({
      label: "Sentence length",
      status: "fail",
      detail: `Sentences average about ${Math.round(avgSentenceWords)} words — too long for a quick phone check. Break them up so the next step (call, book, order) is obvious.`,
    });
  }

  if (avgParagraphWords > 0 && avgParagraphWords <= 80) {
    score += 6;
    findings.push({
      label: "Paragraph length",
      status: "pass",
      detail:
        "Paragraphs look short enough to scan on a phone — good when someone's deciding between you and the next Google result.",
    });
  } else if (avgParagraphWords > 80) {
    score -= 8;
    findings.push({
      label: "Paragraph length",
      status: "warn",
      detail: `Paragraphs average about ${Math.round(avgParagraphWords)} words. Big blocks feel like a wall on mobile — split them so hours, prices, and “call now” don't get buried.`,
    });
  }

  if (listItems >= 3) {
    score += 6;
    findings.push({
      label: "Scannable lists",
      status: "pass",
      detail:
        "Bullet or numbered lists help people grab services, specials, or steps at a glance — which is how most local customers actually read a site.",
    });
  } else {
    score -= 4;
    findings.push({
      label: "Scannable lists",
      status: "warn",
      detail:
        "Few lists showed up. Turning services, menu highlights, or “what's included” into bullets makes the page feel clearer and more professional.",
    });
  }

  const longWordRatio = words.length ? longWords / words.length : 0;
  if (longWordRatio > 0.18) {
    score -= 8;
    findings.push({
      label: "Word complexity",
      status: "warn",
      detail:
        "A lot of long words. Trade industry speak for plain talk — customers hire the shop they understand in ten seconds.",
    });
  } else if (words.length >= 40) {
    score += 4;
    findings.push({
      label: "Word complexity",
      status: "pass",
      detail:
        "The vocabulary feels approachable for everyday customers, not just industry insiders.",
    });
  }

  const finalScore = clampScore(score);
  return {
    score: finalScore,
    summary:
      finalScore >= 80
        ? "Copy is clear and easy for busy local customers to skim."
        : finalScore >= 60
          ? "Readable enough, but tighter sentences would help people decide faster."
          : "Dense writing is likely slowing visitors down before they call or book.",
    findings,
  };
}

export function analyzeDesign(html: string, doc: HTMLElement): CategoryResult {
  const findings: ScoreFinding[] = [];
  let score = 62;

  const hasViewport = Boolean(metaContent(doc, ['meta[name="viewport"]']));
  const hasFavicon = Boolean(
    doc.querySelector('link[rel="icon"], link[rel="shortcut icon"]'),
  );
  const hasThemeColor = Boolean(metaContent(doc, ['meta[name="theme-color"]']));
  const hasNav = Boolean(doc.querySelector("nav"));
  const hasHeader = Boolean(doc.querySelector("header"));
  const hasMain = Boolean(doc.querySelector("main"));
  const hasFooter = Boolean(doc.querySelector("footer"));
  const stylesheets = doc.querySelectorAll(
    "link[rel=\"stylesheet\"], style",
  ).length;
  const inlineStyled = doc.querySelectorAll("[style]").length;
  const usesFlexOrGrid =
    /display\s*:\s*(flex|grid)/i.test(html) ||
    /\b(flex|grid|d-flex|container)\b/i.test(html);
  const usesResponsiveHints =
    /@media/i.test(html) ||
    /\b(sm:|md:|lg:|xl:|max-w-|col-|row-)/i.test(html) ||
    hasViewport;
  const images = doc.querySelectorAll("img");
  const lazyImages = images.filter(
    (img) => (img.getAttribute("loading") || "").toLowerCase() === "lazy",
  ).length;
  const ctaCandidates = doc.querySelectorAll("a, button").filter((el) => {
    const text = textOf(el).toLowerCase();
    return /contact|call|book|quote|start|get started|schedule|buy|shop|learn more|sign up|order|reserve/.test(
      text,
    );
  }).length;
  const obsolete = Boolean(
    doc.querySelector("marquee, blink, font, center, frameset, frame"),
  );
  const tableLayout = doc.querySelectorAll("table").length >= 3;
  const formInputs = doc.querySelectorAll("input, textarea, select").length;
  const labeledControls =
    doc.querySelectorAll("label").length +
    doc.querySelectorAll("[aria-label], [aria-labelledby]").length;

  if (hasViewport) {
    score += 8;
    findings.push({
      label: "Mobile viewport",
      status: "pass",
      detail:
        "The layout is set up for phones. Most local customers find you on mobile first — this keeps your site usable when they're ready to call.",
    });
  } else {
    score -= 14;
    findings.push({
      label: "Mobile viewport",
      status: "fail",
      detail:
        "Missing mobile layout setup. On a phone your site can look tiny or broken, and people will hit the back button instead of calling your shop.",
    });
  }

  const landmarks = [hasNav, hasHeader, hasMain, hasFooter].filter(Boolean)
    .length;
  if (landmarks >= 3) {
    score += 10;
    findings.push({
      label: "Page structure",
      status: "pass",
      detail:
        "The page has clear regions (header, menu, main content, footer). Visitors can find hours and contact without hunting.",
    });
  } else if (landmarks >= 1) {
    score += 2;
    findings.push({
      label: "Page structure",
      status: "warn",
      detail:
        "Some page structure is there, but the layout outline is incomplete. Clearer header/menu/footer areas make a small business site feel more trustworthy.",
    });
  } else {
    score -= 10;
    findings.push({
      label: "Page structure",
      status: "fail",
      detail:
        "No clear header, menu, main area, or footer. That “one big blob” layout makes it harder for customers to find how to reach you.",
    });
  }

  if (usesFlexOrGrid || usesResponsiveHints) {
    score += 8;
    findings.push({
      label: "Modern layout",
      status: "pass",
      detail:
        "The page shows modern layout patterns that usually adapt better across phones and desktops.",
    });
  } else {
    score -= 8;
    findings.push({
      label: "Modern layout",
      status: "warn",
      detail:
        "Little evidence of a modern responsive layout. Older-looking sites make customers wonder if the business is still active.",
    });
  }

  if (stylesheets > 0 && inlineStyled < 25) {
    score += 6;
    findings.push({
      label: "Styling approach",
      status: "pass",
      detail:
        "Styling looks mostly organized. Consistent fonts and spacing make a local business feel intentional, not slapped together.",
    });
  } else if (inlineStyled >= 25) {
    score -= 8;
    findings.push({
      label: "Styling approach",
      status: "warn",
      detail: `We found ${inlineStyled} one-off style tweaks baked into the page. That often leads to uneven spacing and a less professional look over time.`,
    });
  }

  if (hasFavicon) {
    score += 4;
    findings.push({
      label: "Favicon",
      status: "pass",
      detail:
        "Your site has a browser-tab icon. Small detail, but it makes bookmarks and open tabs look like a real brand.",
    });
  } else {
    score -= 4;
    findings.push({
      label: "Favicon",
      status: "warn",
      detail:
        "No browser-tab icon. Visitors see a blank or generic mark instead of your logo — a quick polish win.",
    });
  }

  if (ctaCandidates >= 1) {
    score += 8;
    findings.push({
      label: "Clear calls to action",
      status: "pass",
      detail:
        "There's at least one obvious action button or link (call, book, order, contact). That's what turns a browser into a customer.",
    });
  } else {
    score -= 10;
    findings.push({
      label: "Clear calls to action",
      status: "fail",
      detail:
        "No obvious “Call,” “Book,” “Order,” or “Get a quote” action stood out. People who are ready to spend money shouldn't have to hunt for the next step.",
    });
  }

  if (images.length > 0) {
    const lazyRatio = lazyImages / images.length;
    if (lazyRatio >= 0.4 || images.length <= 2) {
      score += 4;
      findings.push({
        label: "Image loading",
        status: "pass",
        detail:
          "Images are loaded thoughtfully (or the page is light on photos), which helps the site feel snappy on phone data.",
      });
    } else {
      score -= 4;
      findings.push({
        label: "Image loading",
        status: "warn",
        detail:
          "Many photos load all at once. Slow first screens lose hungry diners and emergency callers before they see your number.",
      });
    }
  }

  if (obsolete || tableLayout) {
    score -= 14;
    findings.push({
      label: "Legacy markup",
      status: "fail",
      detail: obsolete
        ? "Outdated page building blocks showed up. That often means the site looks and behaves like it hasn't been updated in years — which costs trust."
        : "Heavy table-based layout usually means an older design. Customers compare you to sleek competitors in the same search results.",
    });
  }

  if (formInputs > 0) {
    if (labeledControls >= Math.ceil(formInputs * 0.6)) {
      score += 4;
      findings.push({
        label: "Form usability",
        status: "pass",
        detail:
          "Contact or booking fields look labeled clearly, so people can request a quote or reservation without guessing.",
      });
    } else {
      score -= 6;
      findings.push({
        label: "Form usability",
        status: "warn",
        detail:
          "Forms are present but labels look weak. Confused forms mean abandoned quote requests and fewer booked jobs or tables.",
      });
    }
  }

  if (hasThemeColor) {
    findings.push({
      label: "Brand chrome",
      status: "info",
      detail:
        "A theme color is set for mobile browsers — a small brand polish when customers open your site on their phone.",
    });
  }

  const finalScore = clampScore(score);
  return {
    score: finalScore,
    summary:
      finalScore >= 80
        ? "The site looks modern and visitor-friendly on the devices customers actually use."
        : finalScore >= 60
          ? "Design is serviceable, with clear polish and usability upgrades available."
          : "Design feels dated or hard to use — fix mobile layout and clear actions first.",
    findings,
  };
}

export function analyzeReachability(
  doc: HTMLElement,
  html: string,
): CategoryResult {
  const findings: ScoreFinding[] = [];
  let score = 55;

  const pageText = textOf(doc);
  const lowerText = pageText.toLowerCase();

  const telLinks = doc
    .querySelectorAll('a[href^="tel:"], a[href^="TEL:"]')
    .filter((el) => Boolean(el.getAttribute("href")));
  const phoneInText =
    /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/.test(pageText);

  if (telLinks.length > 0) {
    score += 18;
    findings.push({
      label: "Phone number",
      status: "pass",
      detail:
        "Your phone number is tappable. On a phone, one tap can turn a search into a booked table or a same-day service call — that's money.",
    });
  } else if (phoneInText) {
    score += 10;
    findings.push({
      label: "Phone number",
      status: "warn",
      detail:
        "A phone number appears on the page, but it isn't a click-to-call link. Mobile customers will copy-paste instead of tapping — and some will just call the competitor who made it easier.",
    });
  } else {
    score -= 18;
    findings.push({
      label: "Phone number",
      status: "fail",
      detail:
        "We couldn't find a phone number. For restaurants and HVAC shops, that's often the #1 way customers reach you — if they can't call in two seconds, they leave.",
    });
  }

  const streetLike =
    /\b\d{1,5}\s+[A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,4}\s+(?:st|street|ave|avenue|rd|road|blvd|boulevard|dr|drive|ln|lane|way|ct|court|hwy|highway)\b/i.test(
      pageText,
    );
  const michiganCue = /\b(?:mi|michigan)\b/i.test(pageText);
  const cityZipCue =
    /\b[A-Za-z][A-Za-z.'-]{2,}(?:\s+[A-Za-z][A-Za-z.'-]{2,})?,\s*(?:MI|Michigan)\s+\d{5}(?:-\d{4})?\b/i.test(
      pageText,
    ) ||
    /\b(?:MI|Michigan)\s+\d{5}(?:-\d{4})?\b/i.test(pageText) ||
    (/\b\d{5}(?:-\d{4})?\b/.test(pageText) && michiganCue);

  if (streetLike || cityZipCue) {
    score += 14;
    findings.push({
      label: "Address / location",
      status: "pass",
      detail:
        "A street address or clear local location cue is on the page. People want to know you're nearby before they order, book, or ask for a quote.",
    });
  } else if (michiganCue) {
    score += 4;
    findings.push({
      label: "Address / location",
      status: "warn",
      detail:
        "Michigan shows up, but we didn't see a clear street address or city+ZIP. Spell out where you're located so local searchers trust you serve their area.",
    });
  } else {
    score -= 14;
    findings.push({
      label: "Address / location",
      status: "fail",
      detail:
        "No clear address or local location details. Customers searching “near me” need to see your town, street, or service area — otherwise they assume you might not cover them.",
    });
  }

  const hasForm = Boolean(doc.querySelector("form"));
  const hasMailto = Boolean(
    doc.querySelector('a[href^="mailto:"], a[href^="MAILTO:"]'),
  );
  const hasContactLink = doc.querySelectorAll("a[href]").some((el) => {
    const href = (el.getAttribute("href") || "").toLowerCase();
    const text = textOf(el).toLowerCase();
    return (
      /contact|get-in-touch|reach-us/.test(href) ||
      /\/contact\b/.test(href) ||
      /\bcontact\b/.test(text)
    );
  });

  if (hasForm || hasMailto || hasContactLink) {
    score += 12;
    const methods = [
      hasForm ? "a contact form" : "",
      hasMailto ? "an email link" : "",
      hasContactLink ? "a contact page/link" : "",
    ].filter(Boolean);
    findings.push({
      label: "Contact method",
      status: "pass",
      detail: `Customers can reach you through ${methods.join(" and ")}. When the phone isn't convenient, that backup path still captures the lead.`,
    });
  } else {
    score -= 14;
    findings.push({
      label: "Contact method",
      status: "fail",
      detail:
        "No contact form, email link, or clear Contact page jumped out. If someone won't call cold, you've given them no other way to ask about pricing, availability, or reservations.",
    });
  }

  const hasHours =
    /\b(?:hours|open(?:ing)?\s+hours|business\s+hours|we're\s+open|open\s+today|closed\s+today)\b/i.test(
      lowerText,
    ) ||
    /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b.{0,40}\d{1,2}\s*(?::\d{2})?\s*(?:am|pm)?/i.test(
      pageText,
    ) ||
    /"openingHours"|OpeningHoursSpecification/i.test(html);

  if (hasHours) {
    score += 12;
    findings.push({
      label: "Hours",
      status: "pass",
      detail:
        "Business hours (or day-by-day open times) appear on the page. That stops the “are they open right now?” bounce that sends people to the next result.",
    });
  } else {
    score -= 10;
    findings.push({
      label: "Hours",
      status: "fail",
      detail:
        "We didn't find clear hours. Hungry diners and emergency callers check hours before they commit — missing hours means lost walk-ins and missed service calls.",
    });
  }

  const finalScore = clampScore(score);
  return {
    score: finalScore,
    summary:
      finalScore >= 80
        ? "Customers can easily find how to reach you, where you are, and when you're open."
        : finalScore >= 60
          ? "Reachability is okay, but phone, address, contact, or hours still need work."
          : "People who want to call, visit, or message you may struggle to find the basics.",
    findings,
  };
}

export function analyzeConversion(
  doc: HTMLElement,
  html: string,
): CategoryResult {
  const findings: ScoreFinding[] = [];
  let score = 55;

  const actionEls = doc.querySelectorAll("a, button");
  const firstActions = actionEls.slice(0, 15);
  const ctaPattern =
    /\b(contact|call|book|order|quote|schedule|reserve|shop)\b/i;
  const aboveFoldCtas = firstActions.filter((el) =>
    ctaPattern.test(textOf(el)),
  );

  if (aboveFoldCtas.length >= 2) {
    score += 16;
    findings.push({
      label: "Above-fold CTA",
      status: "pass",
      detail:
        "Early on the page, visitors see clear actions like call, book, order, or get a quote. That “what do I do next?” moment is where local sites win or lose the job.",
    });
  } else if (aboveFoldCtas.length === 1) {
    score += 8;
    findings.push({
      label: "Above-fold CTA",
      status: "warn",
      detail:
        "There's one early call-to-action, but it could be stronger. Put a bold Call / Book / Order / Get a quote near the top so ready-to-buy visitors don't scroll into distraction.",
    });
  } else {
    score -= 16;
    findings.push({
      label: "Above-fold CTA",
      status: "fail",
      detail:
        "The first links and buttons don't clearly say Contact, Call, Book, Order, Quote, Schedule, Reserve, or Shop. If the next step isn't obvious in seconds, people leave for a competitor.",
    });
  }

  const bookingPattern = /order|book|reserv|schedule|appointment/i;
  const bookingLinks = doc.querySelectorAll("a[href]").filter((el) => {
    const href = el.getAttribute("href") || "";
    const text = textOf(el);
    return bookingPattern.test(href) || bookingPattern.test(text);
  });

  if (bookingLinks.length === 0) {
    score -= 12;
    findings.push({
      label: "Booking links",
      status: "fail",
      detail:
        "No clear booking, ordering, reservation, scheduling, or appointment link stood out. If customers can't start the transaction online, many won't bother calling either.",
    });
  } else {
    const broken = bookingLinks.filter((el) => {
      const href = (el.getAttribute("href") || "").trim().toLowerCase();
      return (
        !href ||
        href === "#" ||
        href.startsWith("javascript:") ||
        href === "#0" ||
        href === "#/"
      );
    });

    if (broken.length > 0) {
      score -= 14;
      findings.push({
        label: "Booking links",
        status: "fail",
        detail: `${broken.length} booking/order-style link${broken.length === 1 ? "" : "s"} look empty or dead (like “#” or a non-working link). A fake Book Now button destroys trust the moment someone clicks it.`,
      });
    } else {
      score += 14;
      findings.push({
        label: "Booking links",
        status: "pass",
        detail:
          "Working booking, order, reservation, or appointment links are present. That path from “interested” to “on the calendar” is how websites pay for themselves.",
      });
    }
  }

  const socialKeywords =
    /\b(reviews?|testimonials?|ratings?|stars?|google reviews?|yelp)\b/i.test(
      textOf(doc),
    );
  const hasAggregateRating = /AggregateRating/i.test(html);
  const reviewLinks = doc.querySelectorAll("a[href]").some((el) => {
    const href = (el.getAttribute("href") || "").toLowerCase();
    return (
      href.includes("yelp.com") ||
      href.includes("google.com/maps") ||
      /g\.page\//i.test(href) ||
      href.includes("maps.app.goo.gl") ||
      (/google\./i.test(href) && /review/i.test(href))
    );
  });

  if ((socialKeywords && (hasAggregateRating || reviewLinks)) || hasAggregateRating) {
    score += 16;
    findings.push({
      label: "Social proof",
      status: "pass",
      detail:
        "Reviews, ratings, or testimonial signals are visible. Local customers buy confidence — stars and real feedback tip the decision your way.",
    });
  } else if (socialKeywords || reviewLinks) {
    score += 6;
    findings.push({
      label: "Social proof",
      status: "warn",
      detail:
        "There's some mention of reviews or a review link, but the proof could be stronger. Feature real ratings or Google/Yelp feedback so first-time visitors aren't guessing if you're trustworthy.",
    });
  } else {
    score -= 12;
    findings.push({
      label: "Social proof",
      status: "fail",
      detail:
        "No clear reviews, testimonials, or rating markup stood out. When two HVAC companies or restaurants look similar, the one with public proof usually gets the call.",
    });
  }

  const finalScore = clampScore(score);
  return {
    score: finalScore,
    summary:
      finalScore >= 80
        ? "The page nudges ready customers toward calling, booking, or ordering."
        : finalScore >= 60
          ? "Conversion basics are partly there — strengthen CTAs, booking paths, and proof."
          : "Visitors may like the page but still leave without calling, booking, or ordering.",
    findings,
  };
}

export function overallScore(categories: {
  seo: CategoryResult;
  relevance: CategoryResult;
  freshness: CategoryResult;
  readability: CategoryResult;
  design: CategoryResult;
  reachability: CategoryResult;
  conversion: CategoryResult;
}) {
  return clampScore(
    categories.reachability.score * 0.22 +
      categories.conversion.score * 0.22 +
      categories.relevance.score * 0.16 +
      categories.seo.score * 0.14 +
      categories.readability.score * 0.1 +
      categories.design.score * 0.1 +
      categories.freshness.score * 0.06,
  );
}

const PRIORITY_RANK: Record<Recommendation["priority"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

type RecommendationRule = {
  area: Recommendation["area"];
  label: string;
  statuses: Array<ScoreFinding["status"]>;
  priority: Recommendation["priority"];
  title: string;
  action: string;
};

const RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    area: "SEO",
    label: "Title tag",
    statuses: ["fail"],
    priority: "high",
    title: "Add a clear page title",
    action:
      "Write a unique page title of about 15–60 characters that names what you do and where — for example “Romeo HVAC Repair | Clemens Heating” or “Warren Pizza Delivery | Tony’s.” That becomes the clickable headline in Google.",
  },
  {
    area: "SEO",
    label: "Title tag",
    statuses: ["warn"],
    priority: "medium",
    title: "Tighten the page title",
    action:
      "Shorten or expand the title so it reads naturally at ~15–60 characters and leads with your main service plus town.",
  },
  {
    area: "SEO",
    label: "Meta description",
    statuses: ["fail"],
    priority: "high",
    title: "Write a meta description",
    action:
      "Add a 70–160 character blurb under your Google listing: what you offer, who it’s for, and why to call today. Don’t leave Google to invent that sentence for you.",
  },
  {
    area: "SEO",
    label: "Meta description",
    statuses: ["warn"],
    priority: "medium",
    title: "Improve the meta description length",
    action:
      "Rewrite the search blurb to land between ~70–160 characters so Google doesn’t cut off your pitch mid-thought.",
  },
  {
    area: "SEO",
    label: "H1 heading",
    statuses: ["fail"],
    priority: "high",
    title: "Add one primary headline",
    action:
      "Put a single clear headline near the top that matches what the visitor came to find — service + location works great for local shops.",
  },
  {
    area: "SEO",
    label: "H1 heading",
    statuses: ["warn"],
    priority: "medium",
    title: "Use a single main headline",
    action:
      "Keep one main headline for the big promise and turn extras into smaller section titles so the message stays focused.",
  },
  {
    area: "SEO",
    label: "Canonical",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Set a preferred page URL",
    action:
      "Mark the official URL for this page so Google doesn’t split your rankings across www / non-www or trailing-slash duplicates.",
  },
  {
    area: "SEO",
    label: "Robots",
    statuses: ["fail"],
    priority: "high",
    title: "Stop hiding this page from Google",
    action:
      "If customers should find this page in search, remove the setting that tells Google not to list it — otherwise you’re invisible on purpose.",
  },
  {
    area: "SEO",
    label: "Viewport",
    statuses: ["warn", "fail"],
    priority: "high",
    title: "Fix mobile display basics",
    action:
      "Add a proper mobile viewport so the page fills the phone screen correctly. Most local searches happen on mobile.",
  },
  {
    area: "SEO",
    label: "Open Graph",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Polish how shared links look",
    action:
      "Add a share title, description, and photo so texts and Facebook posts show your logo or storefront — not a random crop.",
  },
  {
    area: "SEO",
    label: "Twitter card",
    statuses: ["info", "warn", "fail"],
    priority: "low",
    title: "Add an X/Twitter preview",
    action:
      "Set a large image preview card so shares on X look intentional if your customers use it.",
  },
  {
    area: "SEO",
    label: "Structured data",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Add local business details for Google",
    action:
      "Add LocalBusiness-style structured info (name, address, phone, hours) so Google can show richer local results.",
  },
  {
    area: "SEO",
    label: "HTML lang",
    statuses: ["warn", "fail"],
    priority: "low",
    title: "Declare the page language",
    action:
      "Mark the page as English (or your language) so browsers and search tools present it correctly.",
  },
  {
    area: "SEO",
    label: "Image alt text",
    statuses: ["fail"],
    priority: "high",
    title: "Describe your photos in words",
    action:
      "Add short descriptions to important photos — plates, trucks, finished jobs — so Google and screen readers understand what customers would see.",
  },
  {
    area: "SEO",
    label: "Image alt text",
    statuses: ["warn"],
    priority: "medium",
    title: "Fill missing photo descriptions",
    action:
      "Audit images missing descriptions and describe the ones that show your food, work, or storefront.",
  },
  {
    area: "Relevance",
    label: "Content depth",
    statuses: ["fail"],
    priority: "high",
    title: "Expand thin page copy",
    action:
      "Add clear sections covering services or menu highlights, who you serve, proof, and what happens next so the page has enough substance to rank and convert.",
  },
  {
    area: "Relevance",
    label: "Content depth",
    statuses: ["warn"],
    priority: "medium",
    title: "Add more useful detail",
    action:
      "Strengthen the page with specifics: neighborhoods you serve, what’s included, pricing cues, and why neighbors choose you.",
  },
  {
    area: "Relevance",
    label: "Topic structure",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Organize the page with clear sections",
    action:
      "Break the page into scannable sections (Services, Areas, Hours, Reviews, Contact) instead of one long block.",
  },
  {
    area: "Relevance",
    label: "Topic match",
    statuses: ["fail"],
    priority: "high",
    title: "Align the page to what people search",
    action:
      "Rewrite the title, main headline, and opening paragraph so your focus topic appears early and naturally throughout the page.",
  },
  {
    area: "Relevance",
    label: "Topic match",
    statuses: ["warn"],
    priority: "medium",
    title: "Strengthen topic focus",
    action:
      "Weave the focus topic into headings and body copy without stuffing — especially in the first screenful customers see.",
  },
  {
    area: "Relevance",
    label: "Location match",
    statuses: ["fail"],
    priority: "high",
    title: "Say the place names customers search",
    action:
      "Mention your city, county, and service area in plain language on the page. Local searchers need to see their town before they’ll call.",
  },
  {
    area: "Relevance",
    label: "Title / H1 alignment",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Make title and headline reinforce each other",
    action:
      "Use the same core phrase in both the search title and the on-page headline so visitors get one clear message.",
  },
  {
    area: "Freshness",
    label: "Last updated",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Make freshness easy to see",
    action:
      "Add a visible cue that the site is current — a recent blog post, this season’s specials, or an updated date — so visitors don’t have to guess whether you’re still active.",
  },
  {
    area: "Freshness",
    label: "Best update signal",
    statuses: ["warn"],
    priority: "medium",
    title: "Refresh aging content",
    action:
      "Update photos, service details, and examples, then bump the modified date so the page looks actively maintained.",
  },
  {
    area: "Freshness",
    label: "Best update signal",
    statuses: ["fail"],
    priority: "high",
    title: "Overhaul stale content",
    action:
      "Rewrite outdated sections, replace old photos, confirm hours and offers, and republish with a current date customers can trust.",
  },
  {
    area: "Readability",
    label: "Reading ease",
    statuses: ["fail"],
    priority: "high",
    title: "Simplify dense copy",
    action:
      "Cut long sentences and swap jargon for plain language — write like you’d explain it over the counter.",
  },
  {
    area: "Readability",
    label: "Reading ease",
    statuses: ["warn"],
    priority: "medium",
    title: "Make the writing easier to skim",
    action:
      "Shorten a few heavy paragraphs and lead each section with a plain-English takeaway.",
  },
  {
    area: "Readability",
    label: "Sentence length",
    statuses: ["fail", "warn"],
    priority: "medium",
    title: "Shorten long sentences",
    action:
      "Break long sentences into two clearer lines so phone readers don’t give up mid-paragraph.",
  },
  {
    area: "Readability",
    label: "Paragraph length",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Use shorter paragraphs",
    action:
      "Keep most paragraphs to 2–4 sentences so the page feels lighter on mobile.",
  },
  {
    area: "Readability",
    label: "Scannable lists",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Add scannable bullet lists",
    action:
      "Turn services, menu highlights, or “what’s included” into bullets so visitors can grab the point fast.",
  },
  {
    area: "Readability",
    label: "Word complexity",
    statuses: ["warn", "fail"],
    priority: "low",
    title: "Reduce jargon",
    action:
      "Replace long technical phrases with everyday words, or explain them the first time they appear.",
  },
  {
    area: "Design",
    label: "Mobile viewport",
    statuses: ["fail", "warn"],
    priority: "high",
    title: "Fix mobile layout basics",
    action:
      "Make sure the first screen looks clean on a phone — readable type, tappable buttons, no sideways scrolling.",
  },
  {
    area: "Design",
    label: "Page structure",
    statuses: ["fail"],
    priority: "high",
    title: "Rebuild with clear page sections",
    action:
      "Give the site a clear header, menu, main content, and footer so customers can find hours and contact without hunting.",
  },
  {
    area: "Design",
    label: "Page structure",
    statuses: ["warn"],
    priority: "medium",
    title: "Strengthen layout landmarks",
    action:
      "Wrap primary navigation and page content in clearer header/menu/main regions for easier browsing.",
  },
  {
    area: "Design",
    label: "Modern layout",
    statuses: ["warn", "fail"],
    priority: "high",
    title: "Move to a modern responsive layout",
    action:
      "Update the design so it adapts cleanly across phone, tablet, and desktop — dated layouts lose trust in local search.",
  },
  {
    area: "Design",
    label: "Clear calls to action",
    statuses: ["fail", "warn"],
    priority: "high",
    title: "Add a clear primary action",
    action:
      "Put one obvious action above the fold — Call, Book, Order, Get a quote — and repeat it near the end of the page.",
  },
  {
    area: "Design",
    label: "Styling approach",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Clean up inconsistent styling",
    action:
      "Tighten fonts, colors, and spacing so the site feels consistent and professional end to end.",
  },
  {
    area: "Design",
    label: "Favicon",
    statuses: ["warn", "fail"],
    priority: "low",
    title: "Add a favicon",
    action:
      "Upload a simple brand mark so browser tabs look finished and recognizable.",
  },
  {
    area: "Design",
    label: "Image loading",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Speed up below-the-fold photos",
    action:
      "Load only the hero images first and defer the rest so the page feels fast on phone data.",
  },
  {
    area: "Design",
    label: "Legacy markup",
    statuses: ["fail", "warn"],
    priority: "high",
    title: "Retire outdated design patterns",
    action:
      "Replace old layout tricks and obsolete elements with a modern, mobile-friendly design customers trust.",
  },
  {
    area: "Design",
    label: "Form usability",
    statuses: ["warn", "fail"],
    priority: "medium",
    title: "Label every form field",
    action:
      "Give each input a clear label so quote requests and contact forms are easy to finish on any device.",
  },
  {
    area: "Reachability",
    label: "Phone number",
    statuses: ["fail"],
    priority: "high",
    title: "Put a click-to-call number on the page",
    action:
      "Add your main business phone as a tappable link near the top and in the footer. On mobile, one tap should start the call.",
  },
  {
    area: "Reachability",
    label: "Phone number",
    statuses: ["warn"],
    priority: "high",
    title: "Make the phone number tappable",
    action:
      "Turn the visible number into a click-to-call link so phone users don’t have to copy and paste.",
  },
  {
    area: "Reachability",
    label: "Address / location",
    statuses: ["fail"],
    priority: "high",
    title: "Show where you are (or where you serve)",
    action:
      "Add your street address or a clear service-area list with city and ZIP cues. Local customers need to see they’re in range before they call.",
  },
  {
    area: "Reachability",
    label: "Address / location",
    statuses: ["warn"],
    priority: "high",
    title: "Spell out a full local address",
    action:
      "Go beyond “Michigan” — add street, city, and ZIP (or a clear areas-we-serve list) so nearby customers feel confident.",
  },
  {
    area: "Reachability",
    label: "Contact method",
    statuses: ["fail"],
    priority: "high",
    title: "Add a second way to reach you",
    action:
      "Offer a contact form, email link, or dedicated Contact page for people who won’t call cold — then respond quickly.",
  },
  {
    area: "Reachability",
    label: "Hours",
    statuses: ["fail", "warn"],
    priority: "high",
    title: "Publish clear business hours",
    action:
      "List when you’re open by day (and holiday exceptions). “Are they open?” is one of the first things diners and emergency callers check.",
  },
  {
    area: "Conversion",
    label: "Above-fold CTA",
    statuses: ["fail"],
    priority: "high",
    title: "Put a clear action at the top",
    action:
      "Above the fold, add a bold Call, Book, Order, Reserve, or Get a quote button. Ready customers shouldn’t have to hunt for the next step.",
  },
  {
    area: "Conversion",
    label: "Above-fold CTA",
    statuses: ["warn"],
    priority: "high",
    title: "Strengthen the top-of-page action",
    action:
      "Make your primary action more obvious near the top — bigger, clearer wording, and easy to tap with a thumb.",
  },
  {
    area: "Conversion",
    label: "Booking links",
    statuses: ["fail"],
    priority: "high",
    title: "Fix or add real booking/order links",
    action:
      "Link Book / Order / Reserve / Schedule buttons to a real booking page, online ordering, or scheduling tool — never to empty “#” links.",
  },
  {
    area: "Conversion",
    label: "Social proof",
    statuses: ["fail"],
    priority: "high",
    title: "Show reviews and ratings",
    action:
      "Feature Google or Yelp reviews, star ratings, or short testimonials near the top. Proof is what tips a first-time local customer your way.",
  },
  {
    area: "Conversion",
    label: "Social proof",
    statuses: ["warn"],
    priority: "medium",
    title: "Make social proof more visible",
    action:
      "Pull real ratings onto the page and link out to your Google or Yelp profile so visitors can verify the praise.",
  },
];

export function buildRecommendations(categories: {
  seo: CategoryResult;
  relevance: CategoryResult;
  freshness: CategoryResult;
  readability: CategoryResult;
  design: CategoryResult;
  reachability: CategoryResult;
  conversion: CategoryResult;
}): Recommendation[] {
  const buckets: Array<{ area: Recommendation["area"]; result: CategoryResult }> =
    [
      { area: "SEO", result: categories.seo },
      { area: "Relevance", result: categories.relevance },
      { area: "Freshness", result: categories.freshness },
      { area: "Readability", result: categories.readability },
      { area: "Design", result: categories.design },
      { area: "Reachability", result: categories.reachability },
      { area: "Conversion", result: categories.conversion },
    ];

  const recommendations: Recommendation[] = [];
  const seen = new Set<string>();

  for (const rule of RECOMMENDATION_RULES) {
    const bucket = buckets.find((item) => item.area === rule.area);
    if (!bucket) continue;

    const match = bucket.result.findings.find(
      (finding) =>
        finding.label === rule.label && rule.statuses.includes(finding.status),
    );
    if (!match) continue;

    const key = `${rule.area}:${rule.title}`;
    if (seen.has(key)) continue;
    seen.add(key);

    recommendations.push({
      priority: rule.priority,
      area: rule.area,
      title: rule.title,
      action: rule.action,
      findingLabel: rule.label,
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      priority: "low",
      area: "Conversion",
      title: "Keep iterating on conversion",
      action:
        "Fundamentals look solid. Next wins usually come from clearer Call/Book buttons, faster load times, and fresher reviews near the top of the page.",
      findingLabel: "Above-fold CTA",
    });
  }

  return recommendations.sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
  );
}
