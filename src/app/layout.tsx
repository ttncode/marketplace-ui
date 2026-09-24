import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCP Market | Discover Top MCP Servers & Agent Skills",
  description:
    "Discover MCP servers that connect Claude and Cursor to tools like Figma, Databricks, Storybook, and Ghidra. Browse the MCP Market to get started.",
  icons: {
    shortcut: "/favicon.png",
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "96x96", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", type: "image/png", sizes: "96x96", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} light`}>
      <body className="bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
