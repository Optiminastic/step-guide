// Data layer for Stepwise — the step-by-step how-to guide journal.
// Single source of truth for guides + categories. Presentation components
// depend on these types, never the other way around (design-for-change).

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

export interface CategoryMeta {
  name: Category;
  /** Emoji used in topic pills + cover art. */
  icon: string;
  blurb: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  { name: "Technology", icon: "💻", blurb: "Build, code and ship." },
  { name: "Cooking", icon: "🍳", blurb: "Recipes, step by step." },
  { name: "Creator", icon: "🎬", blurb: "Grow an audience." },
  { name: "Career", icon: "📈", blurb: "Land it and level up." },
  { name: "Money", icon: "💰", blurb: "Spend, save, invest." },
  { name: "Lifestyle", icon: "🌿", blurb: "Habits that stick." },
];

export const CATEGORIES: Category[] = CATEGORY_META.map((c) => c.name);

export function categoryIcon(category: Category): string {
  return CATEGORY_META.find((c) => c.name === category)?.icon ?? "📌";
}

const GUIDES: Guide[] = [
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
    slug: "how-to-brew-the-perfect-pour-over-coffee",
    title: "How to Brew the Perfect Pour-Over Coffee",
    excerpt:
      "Café-quality coffee from a $20 dripper — the ratio, the grind, and the pour technique that fixes a bitter or sour cup.",
    category: "Cooking",
    date: "2026-06-09",
    difficulty: "Beginner",
    duration: "About 5 minutes",
    readingTime: 6,
    author: "Anjali Mehta",
    authorRole: "Home Cook",
    intro: [
      "Pour-over looks fussy, but it's really just hot water meeting coffee at the right pace. Nail three variables — ratio, grind, and pour — and you'll make a cleaner, sweeter cup than most cafés.",
      "Here's the repeatable method, plus how to diagnose a cup that comes out bitter or sour.",
    ],
    requirementsLabel: "What you'll need",
    requirements: [
      "A pour-over dripper and paper filter",
      "Fresh whole-bean coffee (20g) and a grinder",
      "A kitchen scale and a kettle",
      "A timer (your phone is fine)",
    ],
    steps: [
      {
        title: "Weigh your coffee and water",
        detail:
          "Start with 20g of coffee to 320g of water — a 1:16 ratio. Weighing, not eyeballing, is what makes the result repeatable.",
      },
      {
        title: "Heat water to just off the boil",
        detail:
          "Aim for about 94°C. If you don't have a thermometer, boil and wait 30 seconds. Too-hot water scorches the grounds bitter.",
      },
      {
        title: "Grind to medium-coarse",
        detail:
          "The grounds should feel like coarse sand. Too fine and the cup turns bitter and slow; too coarse and it runs sour and weak.",
      },
      {
        title: "Rinse the filter and bloom",
        detail:
          "Wet the paper filter to remove papery taste, then pour just enough water to soak the grounds and wait 30 seconds. The 'bloom' lets trapped gas escape.",
      },
      {
        title: "Pour in slow, steady circles",
        detail:
          "Add the rest of the water in two or three pours, spiraling from center to edge. Keep the bed flat and the water level steady.",
      },
      {
        title: "Finish by 3 minutes and taste",
        detail:
          "The whole brew should drain in about three minutes. Bitter? Grind coarser or cool the water. Sour? Grind finer or pour a touch slower.",
      },
    ],
    tips: [
      "Buy whole beans and grind right before brewing — it's the single biggest upgrade.",
      "Keep your ratio fixed and change only one variable at a time when dialing in.",
      "Give the dripper a gentle swirl after the final pour for an even extraction.",
    ],
  },
  {
    slug: "how-to-grow-on-instagram-from-zero",
    title: "How to Grow on Instagram From Zero",
    excerpt:
      "A realistic playbook for going from no followers to a real, engaged audience — content pillars, posting cadence, and the reels formula.",
    category: "Creator",
    date: "2026-06-06",
    difficulty: "Intermediate",
    duration: "Ongoing — first results in weeks",
    readingTime: 9,
    author: "Maya Brooks",
    authorRole: "Creator Coach",
    intro: [
      "Growing on Instagram isn't about gaming an algorithm — it's about making content worth sharing, consistently, for an audience you've clearly defined. The accounts that stall are the ones posting randomly for everyone.",
      "This playbook gives you the structure: who you're for, what you make, and how often.",
    ],
    requirementsLabel: "Before you start",
    requirements: [
      "An Instagram account switched to a free Professional account",
      "A phone that shoots decent video",
      "A simple editing app (Instagram's own, or CapCut)",
      "30–45 focused minutes a day",
    ],
    steps: [
      {
        title: "Define one person you're posting for",
        detail:
          "Write a one-line description of your ideal follower. Content aimed at a specific person travels further than content aimed at everyone.",
      },
      {
        title: "Choose three content pillars",
        detail:
          "Pick three recurring themes you can post about indefinitely. Pillars stop you from staring at a blank screen and keep your feed coherent.",
      },
      {
        title: "Optimize your profile for the click",
        detail:
          "Your bio should say who you help and how in one line. A clear profile converts curious visitors into followers.",
      },
      {
        title: "Make reels with a strong first second",
        detail:
          "Open with motion or a bold claim, deliver one idea, and keep it under 20 seconds. The first second decides whether anyone sees the rest.",
      },
      {
        title: "Post consistently, not constantly",
        detail:
          "Four good posts a week beats fourteen rushed ones. Pick a cadence you can keep for three months without burning out.",
      },
      {
        title: "Reply and engage in the first hour",
        detail:
          "Answer every comment quickly and engage with similar accounts. Early engagement signals the post is worth showing to more people.",
      },
      {
        title: "Review insights and double down",
        detail:
          "Each week, find your top post and make more like it. Let the data, not your ego, decide what you create next.",
      },
    ],
    tips: [
      "Hooks are 80% of a reel — spend more time on the first line than the rest.",
      "Repurpose one idea into a reel, a carousel, and a story instead of inventing three.",
      "Followers are a vanity metric; saves and shares predict real growth.",
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
  {
    slug: "how-to-make-no-knead-sourdough-bread",
    title: "How to Make No-Knead Sourdough Bread",
    excerpt:
      "A crackly crust and an open crumb without kneading or special equipment — the patient, beginner-friendly path to real sourdough.",
    category: "Cooking",
    date: "2026-05-24",
    difficulty: "Intermediate",
    duration: "About 24 hours, mostly waiting",
    readingTime: 12,
    author: "Anjali Mehta",
    authorRole: "Home Cook",
    intro: [
      "Sourdough has a reputation for being temperamental, but most of the work is done by time, not by you. With an active starter and a Dutch oven, a beginner can pull a bakery-worthy loaf out of a home oven.",
      "This no-knead method trades effort for patience — the dough strengthens itself through long folds and a slow rise.",
    ],
    requirementsLabel: "Ingredients & tools",
    requirements: [
      "100g active, bubbly sourdough starter",
      "500g bread flour and 350g water",
      "10g salt",
      "A Dutch oven and a banneton or bowl with a cloth",
    ],
    steps: [
      {
        title: "Feed your starter the night before",
        detail:
          "Your starter should double within a few hours and float in water when ready. A sluggish starter makes a flat loaf.",
      },
      {
        title: "Mix and autolyse",
        detail:
          "Combine flour and water and rest for an hour before adding starter and salt. This 'autolyse' hydrates the flour and kick-starts gluten with zero effort.",
      },
      {
        title: "Do four sets of stretch-and-folds",
        detail:
          "Every 30 minutes for two hours, wet your hand, stretch the dough up and fold it over. This replaces kneading and builds the structure.",
      },
      {
        title: "Bulk ferment until puffy",
        detail:
          "Let the dough rise at room temperature until it's jiggly and grown by about 50%. Time depends on warmth, so watch the dough, not the clock.",
      },
      {
        title: "Shape and cold-proof overnight",
        detail:
          "Shape into a taut ball, place seam-up in a floured banneton, and refrigerate overnight. The cold rest deepens flavor and makes scoring easier.",
      },
      {
        title: "Score and bake in a screaming-hot Dutch oven",
        detail:
          "Preheat the Dutch oven to 250°C, slash the top with a sharp blade, and bake covered for 20 minutes, then uncovered for 20–25 more.",
      },
      {
        title: "Cool completely before slicing",
        detail:
          "Wait at least an hour. Cutting hot bread gums the crumb — the loaf is still cooking as it cools.",
      },
    ],
    tips: [
      "Weigh everything; baker's percentages don't survive guesswork.",
      "A warmer kitchen ferments faster — adjust your timing in summer and winter.",
      "Save your starter discard for pancakes instead of throwing it away.",
    ],
  },
  {
    slug: "how-to-learn-a-new-language-fast",
    title: "How to Learn a New Language (Fast)",
    excerpt:
      "Skip the textbook grind. Build a habit around speaking, high-frequency words, and real input from day one.",
    category: "Lifestyle",
    date: "2026-05-20",
    difficulty: "Intermediate",
    duration: "Daily habit — results in months",
    readingTime: 10,
    author: "Sofia Lang",
    authorRole: "Habits & Productivity",
    intro: [
      "You won't learn a language by memorizing grammar tables — you'll learn it by understanding and producing real sentences, over and over. The fast track isn't a secret app; it's a daily habit pointed at the right things.",
      "This guide focuses your effort on what actually moves you toward conversation.",
    ],
    requirementsLabel: "What you'll need",
    requirements: [
      "A target language and an honest 'why'",
      "20–30 minutes a day, daily",
      "A spaced-repetition app (like Anki)",
      "Access to native content — podcasts, shows, YouTube",
    ],
    steps: [
      {
        title: "Pick a concrete reason and goal",
        detail:
          "'Order food and chat on my trip in six months' beats 'become fluent'. A specific goal tells you what to study and when you've arrived.",
      },
      {
        title: "Learn the 1,000 most frequent words first",
        detail:
          "A small set of words covers most everyday speech. Front-loading high-frequency vocabulary buys the fastest comprehension per hour.",
      },
      {
        title: "Use spaced repetition daily",
        detail:
          "Review flashcards every day so words resurface just before you'd forget them. Ten minutes daily beats an hour once a week.",
      },
      {
        title: "Get comprehensible input early",
        detail:
          "Watch and listen to content just above your level. Understanding real language in context teaches grammar painlessly.",
      },
      {
        title: "Speak from week one",
        detail:
          "Talk to yourself, a tutor, or a language partner immediately. Output reveals exactly which words you're missing.",
      },
      {
        title: "Learn grammar to explain what you already hear",
        detail:
          "Use grammar to make sense of patterns you've encountered, not as a wall to climb before speaking. Just-in-time beats just-in-case.",
      },
      {
        title: "Track a daily streak",
        detail:
          "Consistency compounds. A short session every day will out-perform marathon weekends within a couple of months.",
      },
    ],
    tips: [
      "Change your phone's language once you know the basics for free daily reps.",
      "Mistakes are data, not failure — fluent speakers simply made more of them.",
      "Find content you genuinely enjoy; motivation is the real limiting factor.",
    ],
  },
  {
    slug: "how-to-negotiate-a-salary-raise",
    title: "How to Negotiate a Salary Raise",
    excerpt:
      "Build the case, set the number, and have the conversation with confidence — a calm, evidence-based approach to getting paid more.",
    category: "Career",
    date: "2026-05-16",
    difficulty: "Intermediate",
    duration: "Prep over 1–2 weeks",
    readingTime: 9,
    author: "Sofia Lang",
    authorRole: "Career Strategist",
    intro: [
      "Asking for a raise feels uncomfortable because most people walk in with a feeling instead of a case. Managers don't respond to 'I'd like more money' — they respond to evidence, market data, and a clear number.",
      "This guide turns a nerve-wracking ask into a calm, prepared conversation.",
    ],
    requirementsLabel: "Before the conversation",
    requirements: [
      "A record of your achievements and their impact",
      "Salary benchmarks for your role and region",
      "A specific target number and a walk-away minimum",
      "A good moment — after a win, near review season",
    ],
    steps: [
      {
        title: "Document your wins with numbers",
        detail:
          "List what you delivered and the impact it had on revenue, cost, or time. A raise is paid for results, so make the results undeniable.",
      },
      {
        title: "Research the market rate",
        detail:
          "Use salary sites and peers to learn the real range for your role. Data depersonalizes the ask and anchors it in reality.",
      },
      {
        title: "Decide your number and your floor",
        detail:
          "Pick a specific target slightly above what you'd accept, plus the minimum you'll settle for. Round numbers feel arbitrary; precise ones feel researched.",
      },
      {
        title: "Time the conversation well",
        detail:
          "Raise it after a clear win or during the review cycle when budgets are set. Timing can matter as much as the argument.",
      },
      {
        title: "Open with value, then state the number",
        detail:
          "Briefly recap your impact, then say the number plainly and stop talking. Silence after the ask is your most powerful tool.",
      },
      {
        title: "Handle the response without flinching",
        detail:
          "If it's yes, get it in writing. If it's no, ask what specific outcomes would justify it and set a date to revisit.",
      },
      {
        title: "Get any agreement in writing",
        detail:
          "Verbal promises evaporate at budget time. A short follow-up email confirming the terms protects you.",
      },
    ],
    tips: [
      "Negotiate the whole package — bonus, equity, and flexibility all have value.",
      "Practice the ask out loud until the number rolls off without a wobble.",
      "A 'no' now is often a 'not yet' — leave the door open and a plan in place.",
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

export function getGuidesByCategory(category: Category): Guide[] {
  return getAllGuides().filter((g) => g.category === category);
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
