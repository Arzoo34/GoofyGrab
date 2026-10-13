import type { Article, ContentBlock } from "@/types/cms";
import { heroes } from "./media";

const p = (id: string, html: string): ContentBlock => ({
  type: "paragraph",
  id,
  html,
});
const h = (id: string, text: string, level: 2 | 3 = 2): ContentBlock => ({
  type: "heading",
  id,
  level,
  text,
  anchor: text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-"),
});
const q = (id: string, text: string, cite?: string): ContentBlock => ({
  type: "quote",
  id,
  text,
  cite,
});
const call = (
  id: string,
  tone: "info" | "warn" | "tip",
  title: string,
  body: string,
): ContentBlock => ({ type: "callout", id, tone, title, body });
const list = (id: string, items: string[], ordered = false): ContentBlock => ({
  type: "list",
  id,
  ordered,
  items,
});

const baseSeo = (title: string, description: string) => ({
  metaTitle: `${title} — Goofygrab`,
  metaDescription: description,
  ogTitle: title,
  ogDescription: description,
});

const imgBlock = (id: string, media: Article["heroImage"]): ContentBlock => ({
  type: "image",
  id,
  media,
});
const codeBlock = (
  id: string,
  language: string,
  filename: string,
  code: string,
): ContentBlock => ({ type: "code", id, language, filename, code });
const videoBlock = (id: string, videoId: string, title: string): ContentBlock => ({
  type: "video",
  id,
  provider: "youtube",
  videoId,
  title,
});
const relatedBlock = (id: string, articleIds: string[]): ContentBlock => ({
  type: "related",
  id,
  articleIds,
});
const galleryBlock = (id: string, items: Article["heroImage"][]): ContentBlock => ({
  type: "gallery",
  id,
  items,
});
const embedBlock = (id: string, url: string, title: string): ContentBlock => ({
  type: "embed",
  id,
  url,
  title,
});

type SeedArticle = Omit<
  Article,
  "breaking" | "editorPick" | "sponsored" | "sponsorName" | "relatedArticleIds"
>;

const seedArticles: SeedArticle[] = [
  {
    id: "art-01",
    title: "The wafer is the new oil field",
    slug: "the-wafer-is-the-new-oil-field",
    excerpt:
      "A quiet foundry in Arizona now decides who ships a flagship phone, who trains a frontier model, and who waits until 2028.",
    dek: "Capacity, not cleverness, is the scarce resource. The next decade of computing is a scheduling problem.",
    heroImage: heroes.silicon,
    authorId: "auth-mira",
    categoryId: "cat-ai",
    tagIds: ["tag-chips", "tag-models"],
    publishedAt: "2026-10-08T06:12:00.000Z",
    updatedAt: "2026-10-08T14:00:00.000Z",
    status: "published",
    featured: true,
    trending: true,
    trendingRank: 1,
    readingTime: 12,
    seo: baseSeo(
      "The wafer is the new oil field",
      "How advanced packaging and foundry queues became the real bottleneck of AI.",
    ),
    contentBlocks: [
      p(
        "a1",
        'For a decade the industry told itself a story about software eating the world. Software still eats. It now has to wait in line for a 3-nanometer reservation that was booked before the model architecture existed. See also our <a href="/article/open-source-is-a-staffing-model">staffing-model read on open source</a>.',
      ),
      p(
        "a2",
        "The reservation is not a metaphor. Foundry slotting meetings look like energy auctions: multi-year take-or-pay contracts, penalty clauses, and a quiet secondary market in unused capacity. The labs that win are not always the labs with the flashiest demos.",
      ),
      h("a3", "Packaging is the new lithography"),
      p(
        "a4",
        "Everyone talks nanometers. The constraint that actually slipped this year was advanced packaging: CoWoS, HBM stacks, the unglamorous interposers that turn a pile of dies into a trainable cluster. Yield on those stacks is the new geopolitics.",
      ),
      q(
        "a5",
        "We stopped asking whether the model would converge. We started asking whether the substrate would arrive before the paper.",
        "A lab director, off record",
      ),
      h("a6", "What editors should watch"),
      p(
        "a7",
        "Ignore the parameter counts. Watch construction permits around Phoenix, Tainan, and Dresden. Watch water rights. Watch which cloud quietly renegotiated its 2027 allotment. That is the story, and it does not fit in a keynote.",
      ),
      list("a8", [
        "HBM supply remains tighter than logic wafers.",
        "National industrial policy now prices like a commodity hedge.",
        "Second-tier labs are training on last-gen clusters and calling it a feature.",
      ]),
      call(
        "a9",
        "info",
        "Field note",
        "Goofygrab will track foundry utilization as a running indicator alongside model releases. Capacity is editorial now.",
      ),
      codeBlock(
        "a10",
        "ts",
        "capacity.ts",
        `type Slot = { node: "n3" | "n2"; year: 2026 | 2027 | 2028; mw: number };
const booked: Slot[] = [
  { node: "n3", year: 2026, mw: 42 },
  { node: "n2", year: 2028, mw: 18 },
];`,
      ),
      p(
        "a11",
        "The punchline is almost analog. The most important number in artificial intelligence this year is not a benchmark. It is a queue.",
      ),
    ],
  },
  {
    id: "art-02",
    title: "Foldables finally stopped being a dare",
    slug: "foldables-finally-stopped-being-a-dare",
    excerpt:
      "The third generation of folding phones is less circus, more tool. We lived with one for three weeks.",
    dek: "A hinge you forget is the only hinge that matters.",
    heroImage: heroes.phone,
    authorId: "auth-jules",
    categoryId: "cat-reviews",
    tagIds: ["tag-phones"],
    publishedAt: "2026-10-07T11:40:00.000Z",
    updatedAt: "2026-10-07T11:40:00.000Z",
    status: "published",
    featured: true,
    trending: true,
    trendingRank: 3,
    readingTime: 9,
    seo: baseSeo(
      "Foldables finally stopped being a dare",
      "A three-week field review of the latest folding flagship.",
    ),
    contentBlocks: [
      p(
        "b1",
        "The first foldables were performance art. You bought one to prove you would. The crease was a conversation. The battery was a rumor. You opened it on a train and immediately became a street magician with worse reviews.",
      ),
      p(
        "b2",
        "This one is boring in the way a good laptop is boring. It unfolds, it stays unfolded, and then you work. That is the review.",
      ),
      h("b3", "The score, without the dance"),
      list(
        "b4",
        [
          "Display: 9.1 — inner panel is now a monitor, not a novelty.",
          "Hinge: 8.8 — dust still exists, but the mechanism no longer argues.",
          "Cameras: 7.4 — still a phone that folds, not a camera that happens to fold.",
          "Software: 8.0 — app makers finally stopped letterboxing everything.",
          "Value: 6.9 — the tax for looking like the future remains steep.",
        ],
        true,
      ),
      q(
        "b5",
        "If you notice the crease, the product has already lost. This one made me forget it by day four.",
      ),
      imgBlock("b6", heroes.board),
      call(
        "b7",
        "tip",
        "Buy if",
        "You already live in split-screen and hate carrying a tablet. Skip if you want a camera-first flagship or you drop phones for sport.",
      ),
    ],
  },
  {
    id: "art-03",
    title: "A patch Tuesday that actually mattered",
    slug: "a-patch-tuesday-that-actually-mattered",
    excerpt:
      "A quietly weaponized image parser jumped from proof-of-concept to in-the-wild in nine days. Here is the timeline.",
    dek: "The exploit did not need a novel idea. It needed a forgotten decoder.",
    heroImage: heroes.lock,
    authorId: "auth-rowan",
    categoryId: "cat-security",
    tagIds: ["tag-privacy", "tag-devtools"],
    publishedAt: "2026-10-06T18:05:00.000Z",
    updatedAt: "2026-10-07T09:12:00.000Z",
    status: "published",
    featured: false,
    trending: true,
    trendingRank: 2,
    readingTime: 8,
    seo: baseSeo(
      "A patch Tuesday that actually mattered",
      "How a forgotten image decoder became this month's emergency.",
    ),
    contentBlocks: [
      p(
        "c1",
        'Most patch Tuesdays are housekeeping. This one was a fire drill. A memory-corruption bug in a still-shipping image decoder — the kind of library everyone assumes was retired — showed up in two unrelated incident reports on the same morning. It rhymes with <a href="/article/the-browser-is-a-hostile-runtime-again">the browser becoming a hostile runtime again</a>.',
      ),
      h("c2", "Nine days, start to spray"),
      p(
        "c3",
        "Day zero was a crash in a preview pane. Day three was a reliable sandbox escape on a locked-down laptop. Day nine was a phishing kit with a JPEG that was not a JPEG. The kit did not even bother with a clever subject line.",
      ),
      codeBlock(
        "c4",
        "c",
        "decode.c",
        `// simplified: bounds were documented, never enforced
if (header.chunk > MAX_CHUNK) return ERR;
memcpy(buf, src, header.chunk); // header.chunk was uint32, MAX_CHUNK was int`,
      ),
      call(
        "c5",
        "warn",
        "If you run a fleet",
        "Prioritize anything that still links the legacy decoder. Preview panes, thumbnailers, mail clients. Assume the crash report is already a payload.",
      ),
      videoBlock("c6v", "dQw4w9WgXcQ", "Incident timeline briefing"),
      p(
        "c6",
        "The lesson is unfashionable: memory safety is still a product decision, not a vibe. Languages do not patch themselves. Decoders do not retire because a blog said they should.",
      ),
    ],
  },
  {
    id: "art-04",
    title: "Seed is a mood board again",
    slug: "seed-is-a-mood-board-again",
    excerpt:
      "After two years of 'show me revenue,' the checks are back for infra stories that fit on a single slide.",
    dek: "The pendulum did not invent taste. It just got bored of unit economics.",
    heroImage: heroes.crowd,
    authorId: "auth-priya",
    categoryId: "cat-startups",
    tagIds: ["tag-funding", "tag-models"],
    publishedAt: "2026-10-05T15:20:00.000Z",
    updatedAt: "2026-10-05T15:20:00.000Z",
    status: "published",
    featured: false,
    trending: true,
    trendingRank: 4,
    readingTime: 7,
    seo: baseSeo(
      "Seed is a mood board again",
      "Why early-stage checks returned to narrative-first infrastructure startups.",
    ),
    contentBlocks: [
      p(
        "d1",
        "Walk a Sand Hill coffee line this month and you will hear the same sentence in three accents: we are writing seed again, but only if it is infrastructure. The word has become a mood. Anything with a queue, a kernel, or a compiler gets a meeting. Anything with a storefront gets a lecture.",
      ),
      p(
        "d2",
        "This is not a golden age. It is a rotation. The same partners who demanded 80% gross margin now fund labs that will not invoice until 2028. Narrative is cheaper than diligence when the comparable set is three logos and a waitlist.",
      ),
      q(
        "d3",
        "If your deck has a TAM slide and a GPU slide, pick one. We already know the TAM.",
        "A partner who asked not to be named, which is all of them",
      ),
      h("d4", "What actually closes"),
      list("d5", [
        "A real customer who is not an advisor.",
        "A technical founder who can explain the bottleneck in one sentence.",
        "A plan for compute that is not 'we will figure it out.'",
      ]),
    ],
  },
  {
    id: "art-05",
    title: "Live ops ate the single-player studio",
    slug: "live-ops-ate-the-single-player-studio",
    excerpt:
      "A beloved mid-size studio shipped a campaign and then spent a year staffing a battle pass. The campaign was the trailer.",
    dek: "The season pass is the product. The story is the skin.",
    heroImage: heroes.console,
    authorId: "auth-dex",
    categoryId: "cat-gaming",
    tagIds: ["tag-engines"],
    publishedAt: "2026-10-04T20:00:00.000Z",
    updatedAt: "2026-10-04T20:00:00.000Z",
    status: "published",
    featured: true,
    trending: true,
    trendingRank: 5,
    readingTime: 10,
    seo: baseSeo(
      "Live ops ate the single-player studio",
      "How live-service economics rewired a mid-size campaign studio.",
    ),
    contentBlocks: [
      p(
        "e1",
        "The studio still has a writer' s room. It also has a calendar that looks like a streaming service: seasons, drops, a mid-week currency sale that nobody in narrative approved. The campaign shipped. The campaign is now a funnel.",
      ),
      h("e2", "Engines follow the money"),
      p(
        "e3",
        "Middleware vendors used to sell rendering. They now sell engagement graphs. The most important plugin in the engine is not lighting. It is the live-ops dashboard that tells a producer which weapon skin is underperforming in Brazil.",
      ),
      q(
        "e4",
        "We still make worlds. We just invoice them by the fortnight.",
        "A design director, after the all-hands",
      ),
      p(
        "e5",
        "Players are not confused. They are trained. The confusion belongs to the people who still think a $70 disc is the business.",
      ),
    ],
  },
  {
    id: "art-06",
    title: "The browser is a hostile runtime again",
    slug: "the-browser-is-a-hostile-runtime-again",
    excerpt:
      "Fingerprinting survived the cookie apocalypse. The new tracking stack is quieter, meaner, and mostly legal.",
    dek: "Third-party cookies died. Third-party inference did not.",
    heroImage: heroes.city,
    authorId: "auth-rowan",
    categoryId: "cat-internet",
    tagIds: ["tag-privacy", "tag-policy"],
    publishedAt: "2026-10-03T09:30:00.000Z",
    updatedAt: "2026-10-03T09:30:00.000Z",
    status: "published",
    featured: false,
    trending: false,
    readingTime: 8,
    seo: baseSeo(
      "The browser is a hostile runtime again",
      "How fingerprinting replaced cookies without asking anyone's permission.",
    ),
    contentBlocks: [
      p(
        "f1",
        "The industry held a funeral for the third-party cookie and then hired a statistician. What replaced the cookie is a bundle of probabilistic tells: GPU hash, font bag, audio stack, the exact way your laptop thermal-throttles a canvas.",
      ),
      h("f2", "Consent theater"),
      p(
        "f3",
        "Banner fatigue was the point. If every site asks, nobody reads. The new stack does not even need the banner. It infers. Inference is not a cookie. Inference is a vibe with a legal memo.",
      ),
      call(
        "f4",
        "info",
        "Reader note",
        "Goofygrab's own analytics layer stores events in sessionStorage on device. No third-party pixels. That is a product choice, not a halo.",
      ),
    ],
  },
  {
    id: "art-07",
    title: "A climate model that fits on a laptop",
    slug: "a-climate-model-that-fits-on-a-laptop",
    excerpt:
      "Researchers distilled a regional forecast model into something a field office can run without a supercomputer queue.",
    dek: "Downscaling used to be a cluster. Now it is a binary.",
    heroImage: heroes.satellite,
    authorId: "auth-mira",
    categoryId: "cat-science",
    tagIds: ["tag-climate", "tag-models"],
    publishedAt: "2026-10-02T13:10:00.000Z",
    updatedAt: "2026-10-02T13:10:00.000Z",
    status: "published",
    featured: false,
    trending: false,
    readingTime: 11,
    seo: baseSeo(
      "A climate model that fits on a laptop",
      "Distilled regional climate forecasts are leaving the supercomputer queue.",
    ),
    contentBlocks: [
      p(
        "g1",
        "The paper is dry in the way good papers are dry. The implication is not. A regional climate downscaler that used to require a national lab queue now runs on a workstation in a county emergency office. The accuracy hit is real. The latency collapse is more real.",
      ),
      h("g2", "What distilled means here"),
      p(
        "g3",
        "Not a chatbot. A smaller numerical core trained to imitate a larger one over a bounded geography. Think of it as a cover band that only plays one city. It misses the deep cuts. It is loud enough for a flood map.",
      ),
      list("g4", [
        "Bounded geography is the trick — global skill was never the goal.",
        "Uncertainty bands still need a human who can read them.",
        "Open weights matter more than leaderboard scores for public agencies.",
      ]),
    ],
  },
  {
    id: "art-08",
    title: "Antitrust, but make it a product roadmap",
    slug: "antitrust-but-make-it-a-product-roadmap",
    excerpt:
      "Regulators are no longer asking for breakup slides. They are asking for APIs, defaults, and the right to leave.",
    dek: "The remedy is interoperability. The fight is over who defines the interface.",
    heroImage: heroes.crowd,
    authorId: "auth-priya",
    categoryId: "cat-business",
    tagIds: ["tag-antitrust", "tag-policy"],
    publishedAt: "2026-10-01T16:45:00.000Z",
    updatedAt: "2026-10-01T16:45:00.000Z",
    status: "published",
    featured: false,
    trending: false,
    readingTime: 9,
    seo: baseSeo(
      "Antitrust, but make it a product roadmap",
      "Why interoperability, not breakup, is the live remedy in tech cases.",
    ),
    contentBlocks: [
      p(
        "h1",
        "The old cartoon of antitrust was a judge with a chainsaw. The new cartoon is a standards body with a deadline. Courts and commissions are drafting product requirements: default screens, data portability, messaging gates. Lawyers now sit in sprint planning.",
      ),
      q(
        "h2",
        "We used to ship flags for growth. We now ship flags for consent decrees.",
        "A platform PM",
      ),
      p(
        "h3",
        "Whether this produces a more open web or a more lawyered one is the actual story. Both can be true on the same Tuesday.",
      ),
    ],
  },
  {
    id: "art-09",
    title: "How to make a workstation that does not shout",
    slug: "how-to-make-a-workstation-that-does-not-shout",
    excerpt:
      "A practical build guide for writers, editors, and anyone who needs silence more than RGB.",
    dek: "Fan curves are editorial. So is cable management.",
    heroImage: heroes.desk,
    authorId: "auth-jules",
    categoryId: "cat-howto",
    tagIds: ["tag-devtools"],
    publishedAt: "2026-09-30T10:00:00.000Z",
    updatedAt: "2026-09-30T10:00:00.000Z",
    status: "published",
    featured: false,
    trending: false,
    readingTime: 6,
    seo: baseSeo(
      "How to make a workstation that does not shout",
      "A quiet, durable workstation build for editorial work.",
    ),
    contentBlocks: [
      p(
        "i1",
        "Most 'creator' PCs are nightclubs. You do not need a nightclub to edit 4,000 words. You need a machine that stays under 32 dBA while compiling, with a display that does not try to sell you HDR fireworks at 8 a.m.",
      ),
      h("i2", "The boring bill of materials"),
      list(
        "i3",
        [
          "A case with real intake, not a fish tank.",
          "A PSU that is oversized so it never spins up.",
          "A 27-inch IPS at 120 Hz. You are not racing.",
          "A keyboard you can live with for a decade.",
        ],
        true,
      ),
      call(
        "i4",
        "tip",
        "One rule",
        "If the machine is louder than the espresso grinder, you overspent on the wrong part.",
      ),
    ],
  },
  {
    id: "art-10",
    title: "Open source is a staffing model",
    slug: "open-source-is-a-staffing-model",
    excerpt:
      "The companies that 'give back' are often running a distributed hiring funnel with extra steps.",
    dek: "Maintainers noticed. The fun is over. The invoices are not.",
    heroImage: heroes.code,
    authorId: "auth-mira",
    categoryId: "cat-software",
    tagIds: ["tag-opensource", "tag-devtools"],
    publishedAt: "2026-09-28T12:00:00.000Z",
    updatedAt: "2026-09-28T12:00:00.000Z",
    status: "published",
    featured: false,
    trending: false,
    readingTime: 8,
    seo: baseSeo(
      "Open source is a staffing model",
      "How corporate open source became a hiring funnel with extra steps.",
    ),
    contentBlocks: [
      p(
        "j1",
        "The polite story is contribution. The operational story is pipeline. A well-run public repo is a work sample, a culture screen, and a billboard. That is not inherently cynical. Pretending it is charity is.",
      ),
      p(
        "j2",
        "Maintainers who invoice for support are not ruining the commons. They are pricing a thing that was never free — it was subsidized by people who got tired.",
      ),
      relatedBlock("j3", ["art-03", "art-06"]),
    ],
  },
  {
    id: "art-11",
    title: "The gadget that wanted a subscription",
    slug: "the-gadget-that-wanted-a-subscription",
    excerpt:
      "A $249 desk lamp stopped working when the companion app missed a payment. This is not a metaphor.",
    dek: "Hardware is the hook. Recurring revenue is the product.",
    heroImage: heroes.phone,
    authorId: "auth-jules",
    categoryId: "cat-gadgets",
    tagIds: ["tag-phones", "tag-privacy"],
    publishedAt: "2026-09-26T08:15:00.000Z",
    updatedAt: "2026-09-26T08:15:00.000Z",
    status: "published",
    featured: false,
    trending: false,
    readingTime: 5,
    seo: baseSeo(
      "The gadget that wanted a subscription",
      "When a desk lamp bricks itself over a missed app payment.",
    ),
    contentBlocks: [
      p(
        "k1",
        "The lamp still had LEDs. It still had a switch. The switch now opened a paywall. Support suggested 're-linking the account.' The account wanted $4.99 a month for circadian scheduling the bulb already knew how to do.",
      ),
      q("k2", "We prefer to think of it as a lighting service.", "The company's PR note"),
      p(
        "k3",
        "Buy the dumb version. If there is no dumb version, that is the review.",
      ),
    ],
  },
  {
    id: "art-12",
    title: "Launch windows, water, and the new space beat",
    slug: "launch-windows-water-and-the-new-space-beat",
    excerpt:
      "The space desk is no longer about flags. It is about cadence, insurance, and who owns the spectrum over the coast.",
    dek: "Orbit is infrastructure. Treat it like a port authority story.",
    heroImage: heroes.launch,
    authorId: "auth-rowan",
    categoryId: "cat-science",
    tagIds: ["tag-space", "tag-policy"],
    publishedAt: "2026-09-24T19:00:00.000Z",
    updatedAt: "2026-09-24T19:00:00.000Z",
    status: "published",
    featured: false,
    trending: false,
    readingTime: 9,
    seo: baseSeo(
      "Launch windows, water, and the new space beat",
      "Cadence, insurance, and spectrum — the unglamorous new space beat.",
    ),
    contentBlocks: [
      p(
        "l1",
        "The photographs are still beautiful. The beat is not. Editors who still assign 'the rocket went up' are covering a bus timetable as if it were a moonshot. The story is insurance markets, range scheduling, and the radio licenses that make a constellation legal.",
      ),
      h("l2", "Read the NOTAMs"),
      p(
        "l3",
        "If you cannot read a notice to air missions, you are covering vibes. The operators already know this. Journalism is catching up, slowly, in flame-resistant vests.",
      ),
    ],
  },
  {
    id: "art-13",
    title: "The cloud is a parking garage with better slides",
    slug: "the-cloud-is-a-parking-garage-with-better-slides",
    excerpt:
      "Egress fees, reserved instances, and the slow return of racks you can touch. Infrastructure got unglamorous again — on purpose.",
    dek: "The most interesting technology story this year is a spreadsheet about leaving.",
    heroImage: heroes.lab,
    authorId: "auth-mira",
    categoryId: "cat-tech",
    tagIds: ["tag-chips", "tag-devtools"],
    publishedAt: "2026-10-09T08:00:00.000Z",
    updatedAt: "2026-10-09T08:00:00.000Z",
    status: "published",
    featured: true,
    trending: false,
    readingTime: 8,
    seo: baseSeo(
      "The cloud is a parking garage with better slides",
      "Egress, reserved capacity, and the quiet repatriation of compute.",
    ),
    contentBlocks: [
      p(
        "m1",
        'For fifteen years the industry treated the cloud as weather: always on, billed later, discussed in keynotes. Then finance asked for the receipt. The receipt was a parking garage — reserved spots, surge pricing, and a fee to drive out. Pair this with <a href="/article/the-wafer-is-the-new-oil-field">the wafer as oil field</a> and the picture is not abstract. It is a bill.',
      ),
      h("m2", "Repatriation is a product, not a tweet"),
      p(
        "m3",
        "The companies moving workloads back to metal are not doing it for aesthetics. They have steady utilization, boring traffic, and a CFO who can multiply. Burst still belongs in someone else's building. Baseline does not.",
      ),
      galleryBlock("m4", [heroes.lab, heroes.lock]),
      list("m5", [
        "Egress is the lock. Compute is the bait.",
        "Reserved capacity is a foundry contract with extra YAML.",
        "The slide that says 'multicloud' usually means 'we have not chosen.'",
      ]),
      embedBlock("m6", "https://goofygrab.press/rss.xml", "Goofygrab capacity desk RSS"),
    ],
  },
  {
    id: "art-14",
    title: "Draft: the model evals nobody wants to publish",
    slug: "draft-the-model-evals-nobody-wants-to-publish",
    excerpt:
      "Internal scorecards from three labs tell a smaller story than the blogs. This piece is still in review.",
    dek: "A score without a threat model is a press release.",
    heroImage: heroes.lab,
    authorId: "auth-mira",
    categoryId: "cat-ai",
    tagIds: ["tag-models"],
    publishedAt: "2026-10-10T09:00:00.000Z",
    updatedAt: "2026-10-10T09:00:00.000Z",
    status: "draft",
    featured: false,
    trending: false,
    readingTime: 4,
    seo: baseSeo(
      "The model evals nobody wants to publish",
      "Internal evaluation culture inside frontier labs — draft.",
    ),
    contentBlocks: [
      p(
        "n1",
        "This draft is not public. The newsroom is still confirming which eval suites were run against which checkpoints. Do not ship until legal clears the tables.",
      ),
    ],
  },
  {
    id: "art-15",
    title: "The weekend the app stores blinked",
    slug: "the-weekend-the-app-stores-blinked",
    excerpt:
      "A scheduled Sunday piece on sideloading, fees, and the store as a border. Goes live when the embargo lifts.",
    dek: "Distribution is still the product. Everything else is a skin.",
    heroImage: heroes.city,
    authorId: "auth-priya",
    categoryId: "cat-business",
    tagIds: ["tag-antitrust", "tag-policy"],
    publishedAt: "2026-10-12T06:00:00.000Z",
    updatedAt: "2026-10-10T06:00:00.000Z",
    scheduledFor: "2026-10-12T06:00:00.000Z",
    status: "scheduled",
    featured: false,
    trending: false,
    readingTime: 7,
    seo: baseSeo(
      "The weekend the app stores blinked",
      "Sideloading, fees, and the store as a border — embargoed.",
    ),
    contentBlocks: [
      p(
        "o1",
        "Embargoed until Sunday 06:00 UTC. The reporting is in. The quotes are locked. This exists so the desk can preview layout without leaking into public feeds.",
      ),
    ],
  },
];

export const articles: Article[] = seedArticles.map((a) => ({
  ...a,
  breaking: a.id === "art-03",
  editorPick: a.id === "art-01" || a.id === "art-05" || a.id === "art-13",
  sponsored: a.id === "art-11",
  sponsorName: a.id === "art-11" ? "Lumen Service Co." : undefined,
  relatedArticleIds:
    a.id === "art-01"
      ? ["art-13", "art-10"]
      : a.id === "art-03"
        ? ["art-06", "art-10"]
        : a.id === "art-13"
          ? ["art-01", "art-08"]
          : [],
}));
