import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";

// The app ships only the regular cut; its italic "Market" is the browser's synthesized oblique.
const crimson = Crimson_Text({ variable: "--font-crimson", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = { title: "Sign in" };

/** Auth pages: no marketing chrome, site tokens, their own font. */
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${crimson.variable} min-h-screen bg-background text-[13.5px] leading-[1.55] text-foreground`}>{children}</div>;
}
