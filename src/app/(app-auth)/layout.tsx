import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import styles from "@/components/sites/app-mcpmarket-com-ac75c135/shared/auth.module.css";

// The app ships only the regular cut; its italic "Market" is the browser's synthesized oblique.
const crimson = Crimson_Text({ variable: "--font-crimson", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MCPmarket",
  description: "Store, version, and sync AI agent skills in the cloud",
  icons: { icon: "/sites/app-mcpmarket-com-ac75c135/shared/favicon.svg" },
};

/** app.mcpmarket.com auth pages: no marketing chrome, the app's own tokens and fonts. */
export default function AppAuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${crimson.variable} ${styles.theme}`}>{children}</div>;
}
