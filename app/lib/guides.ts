// Data layer for Stepwise — the step-by-step how-to guide journal.
// Single source of truth for guides. Presentation components depend on these
// types, never the other way around (design-for-change).

export type Category =
  | "Technology"
  | "Cooking"
  | "Creator"
  | "Career"
  | "Money"
  | "Lifestyle";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Step {
  /** Short imperative heading, e.g. "Pick a niche you can sustain". */
  title: string;
  /** One or two sentences expanding on the step. */
  detail: string;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  /** ISO date string (server-stable, no client clock) */
  date: string;
  difficulty: Difficulty;
  /** Human-friendly total time, e.g. "About 45 minutes". */
  duration: string;
  readingTime: number;
  author: string;
  authorRole: string;
  /** Intro paragraphs setting up the guide. */
  intro: string[];
  /** Tools / ingredients / prerequisites — whatever you need before step 1. */
  requirementsLabel: string;
  requirements: string[];
  /** The ordered, numbered steps that make up the guide. */
  steps: Step[];
  /** Closing pro-tips. */
  tips: string[];
}

// Categories are no longer surfaced as navigation/filters in the UI, but each
// guide keeps an internal category so the generative cover art stays themed.
interface CategoryMeta {
  name: Category;
  /** Emoji floated on the cover art. */
  icon: string;
}

const CATEGORY_META: CategoryMeta[] = [
  { name: "Technology", icon: "💻" },
  { name: "Cooking", icon: "🍳" },
  { name: "Creator", icon: "🎬" },
  { name: "Career", icon: "📈" },
  { name: "Money", icon: "💰" },
  { name: "Lifestyle", icon: "🌿" },
];

export function categoryIcon(category: Category): string {
  return CATEGORY_META.find((c) => c.name === category)?.icon ?? "📌";
}

const GUIDES: Guide[] = [
  {
    slug: "how-to-use-claude-code-as-a-software-developer",
    title: "How to Use Claude Code as a Software Developer",
    excerpt:
      "Turn an AI coding agent from a novelty into a daily teammate — setup, workflow, and the habits that keep you in control.",
    category: "Technology",
    date: "2026-06-21",
    difficulty: "Intermediate",
    duration: "About 30 minutes to set up",
    readingTime: 11,
    author: "Devin Rao",
    authorRole: "Staff Engineer",
    intro: [
      "Claude Code is a terminal-based coding agent that reads your repository, edits files, runs commands, and explains its reasoning. Used well, it compresses hours of boilerplate and investigation into minutes — but only if you drive it like a teammate, not a magic box.",
      "This guide covers the workflow that separates developers who ship faster with an agent from those who end up cleaning up after one.",
    ],
    requirementsLabel: "Before you start",
    requirements: [
      "A terminal and a project in a git repository",
      "Node.js installed (for the CLI)",
      "An Anthropic account with Claude Code access",
      "Familiarity with reviewing diffs and pull requests",
    ],
    steps: [
      {
        title: "Install the CLI and authenticate",
        detail:
          "Install Claude Code, run it inside your project directory, and complete the login flow. Working from the repo root gives the agent the context it needs.",
      },
      {
        title: "Write a CLAUDE.md to teach it your project",
        detail:
          "Add a short file describing your stack, conventions, test commands, and any landmines. The agent reads it automatically and stops guessing how your code works.",
      },
      {
        title: "Start with a small, well-scoped task",
        detail:
          "Ask for one concrete change — 'add input validation to the signup form' — rather than 'refactor the app'. Tight scope produces reviewable diffs and fewer surprises.",
      },
      {
        title: "Read the plan before you approve actions",
        detail:
          "Let the agent describe what it intends to do, then approve file edits and commands deliberately. Treat every change like a teammate's pull request.",
      },
      {
        title: "Run the tests and let it fix failures",
        detail:
          "Point the agent at your test command. When something breaks, paste the output back — iterating on real failures is where an agent shines.",
      },
      {
        title: "Commit in small, logical chunks",
        detail:
          "Ask it to commit each coherent unit of work separately. Small commits make it trivial to roll back one decision without losing the rest.",
      },
      {
        title: "Review, then own the result",
        detail:
          "Read the final diff yourself before merging. The agent accelerates you, but the code is still yours to understand and defend.",
      },
    ],
    tips: [
      "Keep a scratch branch — let the agent experiment freely where mistakes are cheap.",
      "If it heads the wrong way, stop and re-prompt rather than letting it dig deeper.",
      "The clearer your request, the better the output. Vague prompts get vague code.",
    ],
  },
  {
    slug: "how-to-start-a-youtube-channel",
    title: "How to Start a YouTube Channel",
    excerpt:
      "From a blank account to your first published video — a no-fluff path to launching a channel people actually subscribe to.",
    category: "Creator",
    date: "2026-06-18",
    difficulty: "Beginner",
    duration: "A weekend to launch",
    readingTime: 9,
    author: "Maya Brooks",
    authorRole: "Creator Coach",
    intro: [
      "Almost everyone who wants to start a YouTube channel waits months for the 'right' camera, the perfect idea, or a sudden burst of confidence. None of that is what gets a channel off the ground — published videos do.",
      "This guide takes you from an empty account to your first upload, with the setup decisions that actually move the needle and the perfectionism traps you can safely ignore.",
    ],
    requirementsLabel: "What you'll need",
    requirements: [
      "A Google account",
      "A smartphone with a decent camera (no DSLR required)",
      "Free editing software (CapCut, DaVinci Resolve, or your phone's editor)",
      "A quiet room and a window for natural light",
    ],
    steps: [
      {
        title: "Pick a niche you can sustain for 50 videos",
        detail:
          "Choose a topic narrow enough to stand out but broad enough that you won't run out of ideas. If you can't imagine 50 video titles, the niche is too thin.",
      },
      {
        title: "Create and brand the channel",
        detail:
          "Set up the channel in YouTube Studio, add a clear profile picture, a banner that states what the channel is about, and a one-line description with your upload schedule.",
      },
      {
        title: "Script your first video around one clear promise",
        detail:
          "Open with the outcome the viewer gets, deliver it in the middle, and close with a single call to action. A tight script beats expensive gear every time.",
      },
      {
        title: "Film in short takes with good light",
        detail:
          "Face a window, prop your phone at eye level, and record in 10–20 second chunks. Short takes are far easier to edit and re-record than one long monologue.",
      },
      {
        title: "Edit for pace, not polish",
        detail:
          "Cut every pause and 'um', add captions, and keep the energy moving. Viewers forgive rough edges; they don't forgive being bored.",
      },
      {
        title: "Design a thumbnail and title that pair",
        detail:
          "The thumbnail and title should tell one story together, not repeat each other. Aim for curiosity plus a clear benefit — and keep thumbnail text under four words.",
      },
      {
        title: "Publish, then study your retention graph",
        detail:
          "Upload, share it once, and resist refreshing the view count. After 48 hours, open the retention graph to see exactly where people dropped off — that's your roadmap for video two.",
      },
    ],
    tips: [
      "Batch-film three videos at once so a single bad day doesn't break your schedule.",
      "Your first 10 videos are practice. Treat them as reps, not referendums on your worth.",
      "Reply to every early comment — engaged viewers train the algorithm faster than views do.",
    ],
  },
  {
    slug: "how-to-make-paneer-tikka",
    title: "How to Make Paneer Tikka at Home",
    excerpt:
      "Smoky, charred, restaurant-style paneer tikka — no tandoor required. A foolproof marinade and the trick to that grilled finish.",
    category: "Cooking",
    date: "2026-06-15",
    difficulty: "Beginner",
    duration: "About 45 minutes + marinating",
    readingTime: 8,
    author: "Anjali Mehta",
    authorRole: "Home Cook",
    intro: [
      "Paneer tikka is the dish that makes people think you've been cooking for years. The secret isn't a tandoor — it's a thick, well-seasoned yogurt marinade and high, dry heat at the finish.",
      "This version gets you the charred edges and smoky aroma of a restaurant grill using nothing more than your oven, a pan, or a stovetop flame.",
    ],
    requirementsLabel: "Ingredients",
    requirements: [
      "250g paneer, cut into 1-inch cubes",
      "1 cup thick Greek-style yogurt (hung curd)",
      "1 bell pepper and 1 onion, cut into squares",
      "1 tbsp ginger-garlic paste",
      "2 tsp Kashmiri red chilli powder, 1 tsp garam masala, 1 tsp roasted cumin",
      "1 tbsp besan (gram flour), 1 tbsp oil, salt and lemon juice",
    ],
    steps: [
      {
        title: "Drain the yogurt until it's thick",
        detail:
          "Hang the yogurt in a cloth for 20 minutes (or use Greek yogurt). Watery marinade slides off the paneer; thick marinade clings and chars.",
      },
      {
        title: "Toast the gram flour",
        detail:
          "Dry-roast the besan in a pan for a minute until it smells nutty. This removes the raw taste and helps the marinade coat evenly.",
      },
      {
        title: "Mix the marinade",
        detail:
          "Combine yogurt, toasted besan, ginger-garlic paste, all the spices, oil, salt, and a squeeze of lemon. Taste it — it should be bold and slightly salty.",
      },
      {
        title: "Coat the paneer and vegetables",
        detail:
          "Fold in the paneer, peppers, and onion gently so the cubes don't crumble. Cover and marinate at least 30 minutes — overnight is even better.",
      },
      {
        title: "Thread onto skewers",
        detail:
          "Alternate paneer and vegetables on skewers, leaving small gaps so the heat reaches every side. Soak wooden skewers first so they don't burn.",
      },
      {
        title: "Cook on high, dry heat",
        detail:
          "Grill, broil at 240°C, or pan-sear, turning until the edges blacken in spots. Brush with a little oil halfway to keep the paneer from drying out.",
      },
      {
        title: "Add a smoky finish",
        detail:
          "For dhungar smoke, place a piece of glowing charcoal in a small bowl among the cooked tikka, drizzle with oil, and cover for two minutes. Serve hot with mint chutney.",
      },
    ],
    tips: [
      "Don't skip the besan — it's what stops the marinade from sliding off.",
      "Soft paneer cubes crumble; if yours is firm, soak them in warm water for 10 minutes first.",
      "Squeeze lemon over the finished tikka, not into the marinade, for a brighter hit.",
    ],
  },
  {
    slug: "how-to-build-your-first-website",
    title: "How to Build Your First Website",
    excerpt:
      "From idea to a live URL — choose the right tools, structure your pages, and ship something real on the internet today.",
    category: "Technology",
    date: "2026-06-12",
    difficulty: "Beginner",
    duration: "An afternoon",
    readingTime: 10,
    author: "Devin Rao",
    authorRole: "Staff Engineer",
    intro: [
      "You don't need to learn three programming languages to put a website online. You need a clear goal, a tool that matches your skill level, and the willingness to ship something imperfect.",
      "This guide walks you from a blank page to a live, shareable URL — and points you toward where to grow once it's up.",
    ],
    requirementsLabel: "What you'll need",
    requirements: [
      "A computer and a modern browser",
      "A clear idea of what the site is for (portfolio, business, blog)",
      "A free hosting account (Netlify, Vercel, or GitHub Pages)",
      "Optional: a domain name (about $12/year)",
    ],
    steps: [
      {
        title: "Decide what the site needs to do",
        detail:
          "Write one sentence describing the visitor's goal. Every page and button should serve that sentence — it's the cheapest way to avoid bloat.",
      },
      {
        title: "Pick a tool that matches your level",
        detail:
          "No-code (Carrd, Framer) for speed, a static site generator for control, or plain HTML/CSS to learn fundamentals. Start one level below what feels ambitious.",
      },
      {
        title: "Sketch the pages before you build",
        detail:
          "Rough out each page on paper: header, main message, supporting content, footer. A five-minute sketch saves an hour of fiddling.",
      },
      {
        title: "Build the homepage first",
        detail:
          "Get one page looking right — clear headline, readable text, one obvious action. The rest of the site borrows its style from here.",
      },
      {
        title: "Make it work on a phone",
        detail:
          "Most visitors arrive on mobile. Shrink your browser window and fix anything that overflows, overlaps, or becomes unreadable.",
      },
      {
        title: "Deploy to a live URL",
        detail:
          "Connect your project to a free host and publish. Seeing your work at a real address is the moment it becomes real — and shareable.",
      },
      {
        title: "Connect a custom domain (optional)",
        detail:
          "Buy a domain and point it at your host using their DNS instructions. A clean address makes the whole thing feel professional.",
      },
    ],
    tips: [
      "Ship the ugly version today; you can only improve something that exists.",
      "Copy a layout you admire as a starting structure — then make it yours.",
      "Keep one backup of your files outside your laptop. Future-you will be grateful.",
    ],
  },
  {
    slug: "how-to-write-a-resume-that-gets-interviews",
    title: "How to Write a Resume That Gets Interviews",
    excerpt:
      "Stop listing duties and start proving impact — the structure, language, and metrics that get a recruiter to call.",
    category: "Career",
    date: "2026-06-03",
    difficulty: "Beginner",
    duration: "About 2 hours",
    readingTime: 8,
    author: "Sofia Lang",
    authorRole: "Career Strategist",
    intro: [
      "Most resumes read like a job description — a list of responsibilities the candidate was supposed to have. The ones that get interviews read like evidence: specific things you achieved, with numbers.",
      "This guide rebuilds your resume around impact, in language a busy recruiter can scan in seven seconds.",
    ],
    requirementsLabel: "What you'll need",
    requirements: [
      "A list of your roles and rough dates",
      "Any metrics you can dig up (numbers, percentages, dollar figures)",
      "The job description you're targeting",
      "A clean one-page template",
    ],
    steps: [
      {
        title: "Lead with a sharp summary",
        detail:
          "Three lines stating who you are, your strongest proof point, and what you're looking for. This is the first — and sometimes only — thing read.",
      },
      {
        title: "Turn duties into achievements",
        detail:
          "Rewrite every bullet to start with a strong verb and end with a result. 'Managed social media' becomes 'Grew Instagram from 2k to 40k in a year.'",
      },
      {
        title: "Quantify everything you can",
        detail:
          "Numbers create instant credibility. If you don't have exact figures, estimate honestly — 'reduced support tickets by ~30%' beats a vague claim.",
      },
      {
        title: "Tailor keywords to the job",
        detail:
          "Mirror the language of the job description so both the screening software and the human recognize the match. Tailor; don't lie.",
      },
      {
        title: "Cut it to one page",
        detail:
          "Remove anything older than ten years or irrelevant to the target role. A tight page signals you can prioritize.",
      },
      {
        title: "Fix the formatting for scanners",
        detail:
          "Use a clean, single-column layout with standard headings. Fancy graphics often confuse applicant-tracking systems and get you filtered out.",
      },
      {
        title: "Proofread out loud, twice",
        detail:
          "Read it aloud to catch typos and clumsy phrasing your eyes skip. One typo can undo an otherwise excellent resume.",
      },
    ],
    tips: [
      "Save a master resume with everything, then trim a tailored copy per application.",
      "Recruiters scan in an F-pattern — put your strongest bullet first under each role.",
      "Export to PDF so your formatting survives the trip to their inbox.",
    ],
  },
  {
    slug: "how-to-start-investing-with-100-dollars",
    title: "How to Start Investing With $100",
    excerpt:
      "You don't need to be rich to start — open the right account, pick a simple fund, and build the habit that compounds.",
    category: "Money",
    date: "2026-05-30",
    difficulty: "Beginner",
    duration: "About 1 hour to set up",
    readingTime: 9,
    author: "Marcus Hale",
    authorRole: "Personal Finance Writer",
    intro: [
      "The biggest investing myth is that you need a lot of money to begin. You need a small amount, a low-cost account, and time — and the habit matters far more than the opening balance.",
      "This guide gets your first $100 invested sensibly and sets up the autopilot that does the real work.",
      "None of this is personalized financial advice; it's a starting framework to learn the mechanics safely.",
    ],
    requirementsLabel: "Before you start",
    requirements: [
      "A government ID and bank account",
      "$100 you won't need for at least five years",
      "An emergency fund already started (even a small one)",
      "About an hour, distraction-free",
    ],
    steps: [
      {
        title: "Pay off high-interest debt first",
        detail:
          "Clearing a credit card charging 20% is a guaranteed 20% return. No investment reliably beats that, so start here.",
      },
      {
        title: "Open a low-cost brokerage or retirement account",
        detail:
          "Choose a reputable broker with no account minimum and no commissions. If your country offers a tax-advantaged account, use it first.",
      },
      {
        title: "Pick one broad index fund",
        detail:
          "A total-market or S&P 500 index fund spreads your $100 across hundreds of companies. Simple and diversified beats clever and concentrated for beginners.",
      },
      {
        title: "Buy fractional shares",
        detail:
          "Fractional investing lets $100 buy a slice of an expensive fund. You're now an investor — the rest is repetition.",
      },
      {
        title: "Automate a recurring contribution",
        detail:
          "Set up an automatic transfer, even $20 a month. Consistency, not timing, is what compounds over decades.",
      },
      {
        title: "Ignore the daily noise",
        detail:
          "Markets bounce around constantly. Checking daily invites panic-selling; review a couple of times a year instead.",
      },
      {
        title: "Increase contributions as income grows",
        detail:
          "Each time you get a raise, bump your automatic investment before lifestyle creep absorbs it.",
      },
    ],
    tips: [
      "Time in the market beats timing the market — start now with whatever you have.",
      "Watch fees: a 1% annual fee can quietly cost you years of returns.",
      "Don't invest money you'll need soon; short horizons and markets don't mix.",
    ],
  },
  {
    slug: "how-to-build-a-morning-routine-that-sticks",
    title: "How to Build a Morning Routine That Sticks",
    excerpt:
      "Forget the 5am cold-plunge fantasy. Build a realistic morning that you'll actually keep, one tiny habit at a time.",
    category: "Lifestyle",
    date: "2026-05-27",
    difficulty: "Beginner",
    duration: "Builds over 2–3 weeks",
    readingTime: 7,
    author: "Sofia Lang",
    authorRole: "Habits & Productivity",
    intro: [
      "Most morning routines fail because they're someone else's routine — a borrowed list of heroic habits that collapses the first hard week. A routine that sticks is small, specific, and built on what you already do.",
      "This guide helps you design a morning that survives real life, not a highlight reel.",
    ],
    requirementsLabel: "What you'll need",
    requirements: [
      "An honest look at your current mornings",
      "One small habit you actually want",
      "A consistent wake-up time (within ~30 minutes)",
      "A little patience — habits take weeks, not days",
    ],
    steps: [
      {
        title: "Audit your current morning honestly",
        detail:
          "For three days, just notice what you actually do after waking. You can't redesign a morning you haven't observed.",
      },
      {
        title: "Anchor a wake-up time you can keep daily",
        detail:
          "Pick a time that works seven days a week, weekends included. Consistency steadies your body clock far more than an early hour does.",
      },
      {
        title: "Start with one keystone habit",
        detail:
          "Add a single small habit — a glass of water, five minutes of stretching, making the bed. One habit you keep beats five you abandon.",
      },
      {
        title: "Stack new habits onto old ones",
        detail:
          "Attach the new habit to something you already do: 'After I start the kettle, I write three lines in my journal.' Existing habits are free triggers.",
      },
      {
        title: "Remove the morning's friction the night before",
        detail:
          "Lay out clothes, prep coffee, and charge your phone outside the bedroom. A frictionless morning is one you actually follow.",
      },
      {
        title: "Protect the first 30 minutes from your phone",
        detail:
          "Delaying email and social media keeps the morning yours instead of reactive. Even a 20-minute buffer changes the whole day's tone.",
      },
      {
        title: "Review weekly and adjust",
        detail:
          "Each Sunday, keep what worked and drop what didn't. A routine is a living thing, not a contract.",
      },
    ],
    tips: [
      "Make the habit so small it feels almost too easy — then let it grow naturally.",
      "Missing one day is normal; never miss two in a row.",
      "Design your evening to make your morning easy. They're the same habit.",
    ],
  },
];

/** Guides sorted newest-first. */
export function getAllGuides(): Guide[] {
  return [...GUIDES].sort((a, b) => b.date.localeCompare(a.date));
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

/** A small, hand-picked set for the "Featured guides" sidebar. */
export function getFeaturedGuides(): Guide[] {
  const featuredSlugs = [
    "how-to-use-claude-code-as-a-software-developer",
    "how-to-make-paneer-tikka",
    "how-to-start-a-youtube-channel",
  ];
  return featuredSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter((g): g is Guide => Boolean(g));
}

/** Stable formatter — avoids locale/clock differences between server and client. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}
