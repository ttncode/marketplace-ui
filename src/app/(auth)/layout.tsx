import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import styles from "@/components/blocks/auth.module.css";

// The app ships only the regular cut; its italic "Market" is the browser's synthesized oblique.
const crimson = Crimson_Text({ variable: "--font-crimson", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = { title: "Sign in" };

/** Auth pages: no marketing chrome, their own tokens and fonts. */
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${crimson.variable} ${styles.theme}`}>{children}</div>;
}
