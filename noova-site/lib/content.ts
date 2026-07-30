// All homepage copy lives here. Voice rules: no exclamation marks; banned words
// (leverage, solutions, passionate, cutting-edge, unlock, elevate, seamless,
// empower, disrupt); no emoji. Positioning: brand & innovation studio, architect
// model — build the system, stay as architect, never daily operator.

export const nav = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Studio", href: "#studio" },
    { label: "Journal", href: "#journal" },
  ],
  cta: { label: "Start a project", href: "#contact" },
};

export const hero = {
  eyebrow: "Brand & innovation studio — London",
  // Zodiak serif, huge. The essence ("Undivided") expressed as coherence.
  headlineLines: ["Brands built", "to cohere."],
  paragraph:
    "noova designs the whole system — strategy, identity, website and the marketing engine behind it. One studio, end to end, so nothing falls between the gaps.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "View work", href: "#work" },
  ticker: "One studio. One system. No handoffs.",
};

export const disciplines = [
  "Brand Strategy",
  "Creative Direction",
  "Identity Systems",
  "Website Design & Build",
  "Content Systems",
  "Growth & AI",
  "Analytics",
  "Art Direction",
];

export const positioning = {
  eyebrow: "The premise",
  statement:
    "Most brands are assembled from parts that never met — a strategy deck, a logo, a site, a feed, each from a different room.",
  emphasis: "We build them as one.",
  body: "noova is a single studio that holds the whole picture: what you stand for, how you look, how you sound, and the system that carries it to market. We build it, hand you the keys, and stay on as its architect — not the agency logging in to post every day.",
};

export type Service = {
  index: string;
  title: string;
  description: string;
  detail: string[];
};

export const services: Service[] = [
  {
    index: "01",
    title: "Brand Strategy",
    description:
      "The thinking underneath everything — positioning, audience, narrative and the one idea the brand is built to own.",
    detail: ["Positioning", "Audience & insight", "Narrative", "Naming"],
  },
  {
    index: "02",
    title: "Creative Direction",
    description:
      "The art direction that keeps every touchpoint speaking with one voice, from campaign to product to feed.",
    detail: ["Art direction", "Campaign concepts", "Tone of voice", "Photography"],
  },
  {
    index: "03",
    title: "Identity Systems",
    description:
      "Not a logo — a complete visual language: type, colour, motion and the rules that hold it together at any scale.",
    detail: ["Visual identity", "Type & colour", "Motion", "Guidelines"],
  },
  {
    index: "04",
    title: "Website Design & Build",
    description:
      "Editorial, fast and considered. Sites designed as the centre of the brand and built to be handed over cleanly.",
    detail: ["Web design", "Front-end build", "CMS", "Performance"],
  },
  {
    index: "05",
    title: "Content Systems",
    description:
      "A repeatable engine for content and social — templates, art direction and rhythm your team can run themselves.",
    detail: ["Content model", "Social systems", "Templates", "Editorial"],
  },
  {
    index: "06",
    title: "Growth & AI",
    description:
      "The measurement and automation layer — analytics, lifecycle and AI workflows designed into the system, not bolted on.",
    detail: ["Analytics", "Lifecycle & email", "AI automation", "Reporting"],
  },
];

export type Work = {
  index: string;
  client: string;
  sector: string;
  title: string;
  disciplines: string[];
  href: string;
  tone: "ink" | "cypress" | "stone";
};

// noova's selected work. Case studies live as pages in the parent portfolio.
export const work: Work[] = [
  {
    index: "01",
    client: "Intellimation",
    sector: "B2B / Enablement",
    title: "A go-to-market system for an AI enablement platform.",
    disciplines: ["Strategy", "Identity", "GTM"],
    href: "#contact",
    tone: "ink",
  },
  {
    index: "02",
    client: "Lumio",
    sector: "Consumer tech",
    title: "Brand, dashboard and paid media as a single engine.",
    disciplines: ["Creative Direction", "Web", "Growth"],
    href: "#contact",
    tone: "cypress",
  },
  {
    index: "03",
    client: "Ritual",
    sector: "Wellness / D2C",
    title: "A lifecycle and CRM system built to keep customers close.",
    disciplines: ["Content", "Email", "Analytics"],
    href: "#contact",
    tone: "stone",
  },
  {
    index: "04",
    client: "Opa Taverne",
    sector: "Hospitality",
    title: "Identity and website for a modern Greek dining room.",
    disciplines: ["Identity", "Web", "Art Direction"],
    href: "#contact",
    tone: "cypress",
  },
];

export type Step = {
  index: string;
  title: string;
  body: string;
};

export const process: Step[] = [
  { index: "01", title: "Discover", body: "We learn the business, the market and the gap only you can hold." },
  { index: "02", title: "Strategise", body: "Positioning and narrative — the single idea the brand is built to own." },
  { index: "03", title: "Design", body: "Identity, art direction and the visual language across every surface." },
  { index: "04", title: "Build", body: "Website, content system and the tooling behind it, built to hand over." },
  { index: "05", title: "Launch", body: "We take it to market as one coherent moment, not scattered parts." },
  { index: "06", title: "Grow", body: "We stay on as architect — measuring, refining, keeping it coherent." },
];

export type Package = {
  name: string;
  summary: string;
  best: string;
  includes: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    name: "Foundation",
    summary: "The strategic and visual core — everything a brand needs to stand up with confidence.",
    best: "Early-stage brands finding their footing",
    includes: [
      "Brand strategy & positioning",
      "Visual identity system",
      "Messaging & tone of voice",
      "Brand guidelines",
    ],
  },
  {
    name: "Growth",
    summary: "Foundation plus the website and content engine — the system that takes the brand to market.",
    best: "Brands ready to scale their presence",
    includes: [
      "Everything in Foundation",
      "Website design & build",
      "Content & social system",
      "Launch direction",
    ],
    featured: true,
  },
  {
    name: "Scale",
    summary: "The full ecosystem, with growth, analytics and AI designed in — and noova on as architect.",
    best: "Established brands building for the long term",
    includes: [
      "Everything in Growth",
      "Growth & lifecycle system",
      "Analytics & AI automation",
      "Ongoing architecture",
    ],
  },
];

export const studio = {
  eyebrow: "Why noova",
  headline: "We believe a brand should feel like one mind, not a committee.",
  body: [
    "The word behind the studio is undivided. When strategy, design, words and marketing come from the same place, a brand stops contradicting itself — and starts compounding.",
    "That is the whole reason noova exists as one studio rather than a chain of vendors. We hold the system end to end, so the thinking that shapes your positioning is the same thinking that shapes your homepage and your first campaign.",
  ],
  quote:
    "A brand is not a logo or a launch. It is the sum of every decision made in its name — and those decisions need one author.",
  stats: [
    { value: "1", label: "studio, end to end" },
    { value: "0", label: "handoffs between vendors" },
    { value: "10+", label: "disciplines under one roof" },
  ],
};

export type Article = {
  category: string;
  title: string;
  readingTime: string;
};

export const journal: Article[] = [
  {
    category: "Branding",
    title: "Coherence is the last real advantage in a crowded category.",
    readingTime: "6 min read",
  },
  {
    category: "Web Design",
    title: "Your website is not a brochure. It is the centre of the brand.",
    readingTime: "5 min read",
  },
  {
    category: "Marketing",
    title: "Why the best systems are the ones you can hand back to the client.",
    readingTime: "7 min read",
  },
];

export const budgets = ["Under £15k", "£15k – £40k", "£40k – £80k", "£80k+"];
export const businessTypes = ["Early-stage", "Scaling brand", "Established company", "Other"];
export const timelines = ["As soon as possible", "1 – 3 months", "3 – 6 months", "Exploring"];

export const contact = {
  eyebrow: "Start a project",
  headline: "Tell us what you are building.",
  body: "A few details are enough to begin. We reply to every serious enquiry within two working days.",
};

export const footer = {
  tagline: "One studio. One system. No handoffs.",
  columns: [
    { title: "Studio", links: ["Work", "Services", "Process", "Journal"] },
    { title: "Connect", links: ["Start a project", "Instagram", "LinkedIn", "Email"] },
  ],
  location: "London",
  colophon: "noova — brand & innovation studio",
};
