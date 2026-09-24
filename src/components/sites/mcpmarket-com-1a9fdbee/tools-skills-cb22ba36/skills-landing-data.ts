import type { CategoryStat, OfficialSkill, SkillCard, SkillFaq, TopSkill } from "./types";

export const OFFICIAL_SKILLS: readonly OfficialSkill[] = [
  { label: "Firecrawl", initials: "FI", href: "/tools/skills/official/firecrawl", avatar: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-135057108.png" },
  { label: "Shopify", initials: "SH", href: "/tools/skills/official/shopify", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-8085.png" },
  { label: "Figma", initials: "FI", href: "/tools/skills/official/figma", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-5155369.png" },
  { label: "Supabase", initials: "SU", href: "/tools/skills/official/supabase", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-54469796.png" },
  { label: "Langchain", initials: "LA", href: "/tools/skills/official/langchain-ai", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-126733545.png" },
  { label: "PostHog", initials: "PO", href: "/tools/skills/official/posthog", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-60330232.png" },
  { label: "Coinbase", initials: "CO", href: "/tools/skills/official/coinbase", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-1885080.png" },
  { label: "Stripe", initials: "ST", href: "/tools/skills/official/stripe", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-856813.png" },
  { label: "Microsoft", initials: "MI", href: "/tools/skills/official/microsoft", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-6154722.png" },
  { label: "Getsentry", initials: "GE", href: "/tools/skills/official/getsentry", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-1396951.png" },
  { label: "NVIDIA", initials: "NV", href: "/tools/skills/official/nvidia", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-1728152.png" },
  { label: "Anthropics", initials: "AN", href: "/tools/skills/official/anthropics", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-76263028.png" },
  { label: "Bitwarden", initials: "BI", href: "/tools/skills/official/bitwarden", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-15990069.png" },
  { label: "Auth0", initials: "AU", href: "/tools/skills/official/auth0", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-2824157.png" },
  { label: "Datadog Labs", initials: "DA", href: "/tools/skills/official/datadog-labs", avatar: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-259158689.png" },
];

export const FEATURED_SKILLS: readonly SkillCard[] = [
  {
    title: "Ad Creative Engine",
    href: "/tools/skills/mp-ad-creative-engine-b43536f7",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/seller-f4dacf87.png", alt: "Growth Lab" },
    description: "Turn a product or offer into a structured spread of ad creative: distinct ANGLES across families (pain, desire, social proof, contrarian, mechanism, identity, urgency), each…",
    badge: { kind: "premium" }, price: "$19",
  },
  {
    title: "Ats Resume Tailor",
    href: "/tools/skills/mp-ats-resume-tailor-b1ba894e",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/seller-c8e5b645.png", alt: "Work Essentials" },
    description: "Tailor ONE resume to ONE job posting so it mirrors the posting's language, clears ATS keyword screening, and returns a match score + a named gap list. Parses the posting's…",
    badge: { kind: "premium" }, price: "$19",
  },
  {
    title: "Advisory Council",
    href: "/tools/skills/mp-advisory-council-0ae4488c",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/seller-00d53bc4.png", alt: "Decision Room" },
    description: "Convene a panel of distinct expert personas to debate ONE real decision and return a decision memo with an explicit recommendation, a confidence level, AND the strongest dissent…",
    badge: { kind: "premium" }, price: "$19",
  },
  {
    title: "Market Research Report",
    href: "/tools/skills/mp-market-research-report-3e6587d3",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/seller-c8e5b645.png", alt: "Work Essentials" },
    description: "Turn a market or topic into a structured report with explicit TAM/SAM/SOM sizing (assumptions shown, sensitivity noted, top-down AND bottom-up), buyer segments, the competitive…",
    badge: { kind: "premium" }, price: "$19",
  },
  {
    title: "Content Atomizer",
    href: "/tools/skills/mp-content-atomizer-df880f70",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/seller-96aef99b.png", alt: "Creator Studio" },
    description: "Turn ONE long-form source (podcast, webinar, YouTube video, livestream, keynote, blog post, newsletter, or raw transcript) into a complete multi-platform content package —…",
    badge: { kind: "premium" }, price: "$19",
  },
  {
    title: "Grill Me",
    href: "/tools/skills/grill-me",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-33248556.png", alt: "vechain" },
    description: "Conducts rigorous, structured interviews to stress-test project plans and resolve architectural ambiguities before implementation begins.",
    badge: { kind: "category", label: "Productivity & Workflow" },
  },
];

export const LATEST_SKILLS: readonly SkillCard[] = [
  {
    title: "Simple Text Ai Tool",
    href: "/tools/skills/mp-simple-text-ai-tool-09382b05",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-324163658.png", alt: "AM AI Tools" },
    description: "An AI tool that processes user text and returns helpful responses.",
    badge: { kind: "category", label: "Productivity & Workflow" },
  },
  {
    title: "Swift Animations",
    href: "/tools/skills/swift-animations",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-121172973.png", alt: "Mattakushi432" },
    description: "Builds fluid SwiftUI and UIKit animations including spring physics, keyframe sequences, and matched geometry transitions.",
    badge: { kind: "category", label: "Mobile Development" },
  },
  {
    title: "Swift Accessibility",
    href: "/tools/skills/swift-accessibility",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-121172973.png", alt: "Mattakushi432" },
    description: "Implements comprehensive accessibility features, VoiceOver support, and Dynamic Type patterns for iOS and macOS applications.",
    badge: { kind: "category", label: "Mobile Development" },
  },
  {
    title: "Survey Design",
    href: "/tools/skills/survey-design",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-121172973.png", alt: "Mattakushi432" },
    description: "Designs unbiased, high-converting surveys, questionnaires, and feedback loops with validated statistical sampling and metric frameworks.",
    badge: { kind: "category", label: "Analytics & Monitoring" },
  },
  {
    title: "Supply Chain Security",
    href: "/tools/skills/supply-chain-security-3",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-121172973.png", alt: "Mattakushi432" },
    description: "Secures software supply chains through dependency pinning, SBOM generation, artifact signing, and SLSA provenance attestations.",
    badge: { kind: "category", label: "Security & Testing" },
  },
  {
    title: "Business Strategy Frameworks",
    href: "/tools/skills/business-strategy-frameworks-2",
    avatar: { src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-cb22ba36/avatars/avatar-121172973.png", alt: "Mattakushi432" },
    description: "Guides executive strategic planning and business analysis using proven corporate strategy frameworks and decision-making templates.",
    badge: { kind: "category", label: "Productivity & Workflow" },
  },
];

export const CATEGORY_STATS: readonly CategoryStat[] = [
  { name: "Productivity & Workflow", href: "/tools/skills/categories/productivity-workflow", count: "69,769", icon: "star" },
  { name: "Security & Testing", href: "/tools/skills/categories/security-testing", count: "44,062", icon: "layers" },
  { name: "Data Science & ML", href: "/tools/skills/categories/data-science-ml", count: "29,450", icon: "database" },
  { name: "Developer Tools", href: "/tools/skills/categories/developer-tools", count: "27,410", icon: "code" },
  { name: "Design Tools", href: "/tools/skills/categories/design-tools", count: "25,804", icon: "penTool" },
  { name: "Collaboration Tools", href: "/tools/skills/categories/collaboration-tools", count: "20,661", icon: "users" },
  { name: "API Development", href: "/tools/skills/categories/api-development", count: "20,559", icon: "terminal" },
  { name: "Learning & Documentation", href: "/tools/skills/categories/learning-documentation", count: "19,406", icon: "layers" },
];

export const TOP_SKILLS: readonly TopSkill[] = [
  { rank: "01", title: "Meme Maker", href: "/tools/skills/meme-maker-1", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Content Management", count: "388k" },
  { rank: "02", title: "Agent Skill Creator", href: "/tools/skills/agent-skill-creator-1787994711990", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Productivity & Workflow", count: "388k" },
  { rank: "03", title: "Sherpa ONNX Local Text-to-Speech", href: "/tools/skills/sherpa-onnx-local-text-to-speech", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Data Science & ML", count: "388k" },
  { rank: "04", title: "OpenClaw Channel Configurator", href: "/tools/skills/openclaw-channel-configurator", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Collaboration Tools", count: "388k" },
  { rank: "05", title: "1Password CLI", href: "/tools/skills/1password-cli-1", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Security & Testing", count: "388k" },
  { rank: "06", title: "Background Coding Agent", href: "/tools/skills/background-coding-agent", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Productivity & Workflow", count: "388k" },
  { rank: "07", title: "TaskFlow Inbox Triage", href: "/tools/skills/taskflow-inbox-triage-2", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Productivity & Workflow", count: "388k" },
  { rank: "08", title: "Diagram Maker & Visualizer", href: "/tools/skills/diagram-maker-visualizer", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Learning & Documentation", count: "379k" },
  { rank: "09", title: "GH Issues Auto-Fixer", href: "/tools/skills/gh-issues-auto-fixer", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Collaboration Tools", count: "330k" },
  { rank: "10", title: "Discord Integration", href: "/tools/skills/discord-integration", avatar: { src: "/sites/mcpmarket-com-1a9fdbee/root-8a5edab2/avatars/avatar-252820863.png", alt: "openclaw" }, category: "Collaboration Tools", count: "313k" },
];

export const SKILL_FAQS: readonly SkillFaq[] = [
  {
    question: "What are Agent Skills (Claude Skills)?",
    answer: "Agent Skills, also known as Claude Skills, are folders containing instructions, scripts, and resources that AI agents load dynamically to improve performance on specialized tasks. They package expertise into discoverable capabilities that help AI assistants complete specific tasks more effectively.",
  },
  {
    question: "How do Agent Skills work?",
    answer: "Skills are model-invoked—AI agents autonomously decide when to use them based on your request and the Skill's description. They use only ~100 tokens for scanning and less than 5,000 tokens when activated, making them efficient and powerful.",
  },
  {
    question: "Do ChatGPT and Codex support skills?",
    answer: "Yes! As of December 2025, OpenAI adopted the skills format for ChatGPT and Codex CLI. Skills are now an open standard that works across Claude, ChatGPT, Codex, Cursor, and other MCP-enabled AI platforms.",
  },
  {
    question: "How do I install an Agent Skill?",
    answer: "Skills can be installed in several ways depending on your platform. For Claude: Add to ~/.claude/skills/ for personal use, or .claude/skills/ for project sharing. For ChatGPT: Use the /home/oai/skills folder. For Codex CLI: Add to ~/.codex/skills/.",
  },
  {
    question: "Where can I use Agent Skills?",
    answer: "Skills are portable—they use the same format everywhere. Build once, use across Claude, ChatGPT, Codex, Cursor, and any MCP-enabled platform. This open standard means skills work consistently across different AI assistants.",
  },
  {
    question: "What's the difference between Skills and MCP servers?",
    answer: "Skills extend AI agent capabilities through instructions and scripts that agents load when needed for specific tasks. MCP (Model Context Protocol) servers are standalone protocol implementations that connect AI agents to external tools, services, and data sources. Skills teach agents how to do things, while MCP servers connect agents to things—they work best together.",
  },
  {
    question: "Is MCP Market a skills marketplace?",
    answer: "Yes. MCP Market is an Agent Skills marketplace and directory. Browse free open-source skills, install them in Claude.ai, Claude Code, Codex, or ChatGPT, and buy premium skills from verified sellers — alongside the largest directory of MCP servers.",
  },
];
