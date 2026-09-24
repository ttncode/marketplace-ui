"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CategoryRail } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/CategoryRail";
import { HERO } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/site-data";
import { HeroDitherShader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/HeroDitherShader";

const HOLD_MS = 2000;
const DELETE_MS = 50;
const TYPE_MS = 80;

const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.28) 20%, rgba(0,0,0,0.32) 38%, rgba(0,0,0,0.38) 56%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0.28) 86%, rgba(0,0,0,0.12) 94%, transparent 100%)";

const WORDS = HERO.rotatingTerms;

function useTypewriter(): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState<string>(WORDS[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    const holding = !deleting && text === word;
    const delay = holding ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS;
    const id = setTimeout(() => {
      if (holding) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % WORDS.length);
      } else {
        setText(deleting ? text.slice(0, -1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [wordIndex, text, deleting]);

  return text;
}

export function HeroSection() {
  const router = useRouter();
  const typed = useTypewriter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("search") ?? "").trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-[#fbfbfb] p-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: HERO_MASK, WebkitMaskImage: HERO_MASK }}
      >
        <div className="design-dither-static absolute inset-0" />
        <HeroDitherShader />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid min-h-[440px] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(350px,1fr)_auto] items-center pt-[18px] pb-2 text-center text-[#0a0a0a] max-md:min-h-[590px] max-md:grid-rows-[minmax(430px,1fr)_auto] max-md:pt-[58px] max-md:pb-[18px] md:max-[899px]:min-h-[620px] md:max-[899px]:grid-rows-[minmax(480px,1fr)_auto] md:max-[899px]:pt-[52px]">
          <div className="z-[2] flex w-[min(100%,1180px)] min-w-0 flex-col items-center justify-self-center">
            <div className="mb-[14px] inline-flex self-center">
              <div className="inline-flex items-center gap-3 rounded-[999px] border border-[rgba(34,34,34,0.12)] bg-[#f5f5f5] px-3 py-1.5 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.8px] text-[rgba(10,10,10,0.68)] shadow-[-4px_-4px_10px_rgba(255,255,255,0.62),5px_5px_12px_rgba(74,74,74,0.2),inset_0_1px_0_rgba(255,255,255,0.46)]">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 animate-pulse rounded-full bg-[#0a0a0a] [animation-duration:3.4s]" />
                  <span>
                    <strong className="font-semibold text-[#0a0a0a]">{HERO.serverCount}</strong> Servers
                  </span>
                </span>
                <span className="hidden h-3 w-px bg-[#dbdbdb] sm:block" />
                <span className="hidden gap-1 text-[#616161] sm:flex">{HERO.updatedLabel}</span>
              </div>
            </div>
            <div className="relative isolate z-0 w-full before:pointer-events-none before:absolute before:inset-[-38px_-76px_-44px] before:-z-10 before:blur-[14px] before:content-[''] before:[background:radial-gradient(82%_84%_at_50%_48%,rgba(255,255,255,0.46)_0,rgba(255,255,255,0.34)_46%,rgba(255,255,255,0.16)_68%,transparent_90%)] max-md:before:inset-[-30px_-42px_-36px] max-md:before:[background:radial-gradient(82%_86%_at_50%_48%,rgba(255,255,255,.5)_0,rgba(255,255,255,.36)_48%,rgba(255,255,255,.16)_70%,transparent_92%)] md:max-[899px]:before:inset-x-[-64px] md:max-[899px]:before:[background:radial-gradient(84%_84%_at_50%_48%,rgba(255,255,255,.48)_0,rgba(255,255,255,.35)_48%,rgba(255,255,255,.16)_70%,transparent_92%)]">
              <h1 className="m-0 mx-auto max-w-[1180px] text-balance font-display text-[clamp(50px,5vw,72px)] font-normal leading-[0.94] tracking-[-0.055em] text-[#0a0a0a] max-md:text-[clamp(44px,14vw,66px)] md:max-[899px]:max-w-[760px]">
                <span className="sr-only">{`${HERO.title} ${WORDS.join(" - ")}`}</span>
                <span aria-hidden="true" className="block">
                  <span className="block">{HERO.title}</span>
                  <span className="text-[#444444]">
                    {typed}
                    <span className="animate-pulse">|</span>
                  </span>
                </span>
              </h1>
              <p className="mx-auto mt-[18px] max-w-[650px] font-sans text-base leading-[1.65] tracking-[-0.018em] text-[rgba(10,10,10,0.64)] max-md:max-w-[92%] max-md:text-[15px]">
                {HERO.description}
              </p>
            </div>
            <form role="search" onSubmit={handleSubmit} className="mt-[22px] w-[min(100%,610px)]">
              <div className="relative overflow-hidden rounded-[10px] bg-[rgba(255,255,255,0.78)] shadow-[0_18px_42px_rgba(10,10,10,0.1),inset_0_1px_0_rgba(255,255,255,0.64),inset_0_-1px_0_rgba(34,34,34,0.06)] backdrop-blur-[14px] backdrop-saturate-[0.86] transition-[background-color,box-shadow] duration-[180ms] ease-[ease] focus-within:bg-[rgba(255,255,255,0.9)] focus-within:shadow-[0_20px_46px_rgba(34,34,34,0.16),inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(34,34,34,0.08)]">
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  placeholder={HERO.searchPlaceholder}
                  aria-label={HERO.searchPlaceholder}
                  className="flex h-[52px] w-full rounded-[10px] border-0 bg-transparent px-12 py-2 font-sans text-sm leading-5 tracking-[-0.14px] text-[#0a0a0a] shadow-none outline-none placeholder:text-[rgba(34,34,34,0.48)]"
                />
                <Search
                  aria-hidden="true"
                  strokeWidth={2}
                  className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[rgba(34,34,34,0.58)]"
                />
                <button type="submit" className="sr-only">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="w-full min-w-0 pt-[22px] max-md:pt-[42px]">
            <CategoryRail />
          </div>
        </div>
      </div>
    </section>
  );
}
