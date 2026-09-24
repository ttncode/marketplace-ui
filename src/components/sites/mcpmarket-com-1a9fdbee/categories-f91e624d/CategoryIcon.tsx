import type { ReactNode } from "react";
import styles from "./CategoryIcon.module.css";

/** The class the card link needs so its hover starts the icon animations. */
export const ICON_HOVER_SCOPE = styles.tile;

function AnimatedSvg({ className, children }: { readonly className?: string; readonly children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Plain lucide icons: the source only scales them to 105% on card hover. */
function StaticSvg({ children }: { readonly children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[18px] w-[18px] scale-100 text-muted-foreground transition-transform duration-200 group-hover:scale-105"
    >
      {children}
    </svg>
  );
}

const SettingsIcon = () => (
  <AnimatedSvg className={styles.gear}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </AnimatedSvg>
);

const TrendingUpIcon = () => (
  <AnimatedSvg className={styles.trendSvg}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" pathLength={1} className={styles.trendLine} />
    <polyline points="16 7 22 7 22 13" pathLength={1} className={styles.trendArrow} />
  </AnimatedSvg>
);

const WorkflowIcon = () => (
  <AnimatedSvg>
    <rect width="8" height="8" x="3" y="3" rx="2" pathLength={1} className={styles.flowBox} />
    <path d="M7 11v4a2 2 0 0 0 2 2h4" pathLength={1} className={styles.flowLink} />
    <rect width="8" height="8" x="13" y="13" rx="2" pathLength={1} className={styles.flowBox} />
  </AnimatedSvg>
);

const ChartBarIcon = () => (
  <AnimatedSvg>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="M7 11h8" pathLength={1} className={styles.bar} />
    <path d="M7 16h12" pathLength={1} className={styles.bar} />
    <path d="M7 6h3" pathLength={1} className={styles.bar} />
  </AnimatedSvg>
);

const ShieldCheckIcon = () => (
  <AnimatedSvg>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" pathLength={1} className={styles.check} />
  </AnimatedSvg>
);

const SearchIcon = () => (
  <AnimatedSvg className={styles.searchSvg}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </AnimatedSvg>
);

const RocketIcon = () => (
  <AnimatedSvg className={styles.rocket}>
    <path
      d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
      className={styles.flame}
    />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </AnimatedSvg>
);

const LayersIcon = () => (
  <AnimatedSvg>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" className={styles.layerLow} />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" className={styles.layerMid} />
  </AnimatedSvg>
);

const FileTextIcon = () => (
  <AnimatedSvg className={styles.grow}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" pathLength={1} className={styles.docLine} />
    <path d="M16 13H8" pathLength={1} className={styles.docLine} />
    <path d="M16 17H8" pathLength={1} className={styles.docLine} />
  </AnimatedSvg>
);

const UsersIcon = () => (
  <AnimatedSvg>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" className={styles.friend} />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" className={styles.friend} />
  </AnimatedSvg>
);

const CloudUploadIcon = () => (
  <AnimatedSvg>
    <path d="M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
    <g className={styles.lift}>
      <path d="M12 13v8" />
      <path d="m8 17 4-4 4 4" />
    </g>
  </AnimatedSvg>
);

const ZapIcon = () => (
  <AnimatedSvg>
    <path
      d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      pathLength={1}
      className={styles.zap}
    />
  </AnimatedSvg>
);

const PlugIcon = () => (
  <StaticSvg>
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
  </StaticSvg>
);

const BookOpenIcon = () => (
  <StaticSvg>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </StaticSvg>
);

const DatabaseIcon = () => (
  <StaticSvg>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </StaticSvg>
);

const MegaphoneIcon = () => (
  <StaticSvg>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </StaticSvg>
);

const ShoppingCartIcon = () => (
  <StaticSvg>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </StaticSvg>
);

const PaletteIcon = () => (
  <StaticSvg>
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </StaticSvg>
);

const MousePointerIcon = () => (
  <StaticSvg>
    <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="m13 13 6 6" />
  </StaticSvg>
);

const Share2Icon = () => (
  <StaticSvg>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </StaticSvg>
);

const Gamepad2Icon = () => (
  <StaticSvg>
    <line x1="6" x2="10" y1="11" y2="11" />
    <line x1="8" x2="8" y1="9" y2="13" />
    <line x1="15" x2="15.01" y1="12" y2="12" />
    <line x1="18" x2="18.01" y1="10" y2="10" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
  </StaticSvg>
);

/** Same name → icon table as the source; unlisted names ("Official") fall back to the zap. */
const ICONS: Readonly<Record<string, () => ReactNode>> = {
  "Developer Tools": SettingsIcon,
  "Data Science & ML": TrendingUpIcon,
  "API Development": PlugIcon,
  "Productivity & Workflow": WorkflowIcon,
  "Analytics & Monitoring": ChartBarIcon,
  "Security & Testing": ShieldCheckIcon,
  "Web Scraping & Data Collection": SearchIcon,
  "Deployment & DevOps": RocketIcon,
  Other: LayersIcon,
  "Mobile Development": LayersIcon,
  "Learning & Documentation": BookOpenIcon,
  "Database Management": DatabaseIcon,
  "Content Management": FileTextIcon,
  "Collaboration Tools": UsersIcon,
  "Cloud Infrastructure": CloudUploadIcon,
  "Marketing Automation": MegaphoneIcon,
  "E-commerce Solutions": ShoppingCartIcon,
  "Design Tools": PaletteIcon,
  "Browser Automation": MousePointerIcon,
  "Social Media Management": Share2Icon,
  "Game Development": Gamepad2Icon,
};

export function CategoryIcon({ name }: { readonly name: string }) {
  const Icon = ICONS[name] ?? ZapIcon;
  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
      <Icon />
    </div>
  );
}
