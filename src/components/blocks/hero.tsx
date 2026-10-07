"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CategoryRail } from "@/components/blocks/category-rail";
import { HeroDitherShader } from "@/components/blocks/dither-background";
import type { HeroContent, LinkRef } from "@/lib/types";

const HOLD_MS = 2000;
const DELETE_MS = 50;
const TYPE_MS = 80;

const HERO_MASK =
  "var(--design-mask-hero-fade)";

function useTypewriter(words: readonly string[]): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState<string>(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const holding = !deleting && text === word;
    const delay = holding ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS;
    const id = setTimeout(() => {
      if (holding) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      } else {
        setText(deleting ? text.slice(0, -1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [words, wordIndex, text, deleting]);

  return text;
}

export function HeroSection({
  hero,
  categoryLinks,
}: {
  readonly hero: HeroContent;
  readonly categoryLinks: readonly LinkRef[];
}) {
  const router = useRouter();
  const typed = useTypewriter(hero.rotatingTerms);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("search") ?? "").trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-canvas p-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: HERO_MASK, WebkitMaskImage: HERO_MASK }}
      >
        <div className="design-dither-static absolute inset-0" />
        <HeroDitherShader />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid min-h-[440px] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(350px,1fr)_auto] items-center pt-[18px] pb-2 text-center text-ink max-md:min-h-[590px] max-md:grid-rows-[minmax(430px,1fr)_auto] max-md:pt-[58px] max-md:pb-[18px] md:max-[899px]:min-h-[620px] md:max-[899px]:grid-rows-[minmax(480px,1fr)_auto] md:max-[899px]:pt-[52px]">
          <div className="z-[2] flex w-[min(100%,1180px)] min-w-0 flex-col items-center justify-self-center">
            <div className="mb-[14px] inline-flex self-center">
              <div className="inline-flex items-center gap-3 rounded-[999px] border border-ink/12 bg-surface-muted px-3 py-1.5 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.8px] text-ink/68 shadow-[var(--design-shadow-hero-chip)]">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 animate-pulse rounded-full bg-ink [animation-duration:3.4s]" />
                  <span>
                    <strong className="font-semibold text-ink">{hero.countLabel}</strong>
                  </span>
                </span>
                <span className="hidden h-3 w-px bg-border sm:block" />
                <span className="hidden gap-1 text-ink-muted sm:flex">{hero.updatedLabel}</span>
              </div>
            </div>
            <div className="relative isolate z-0 w-full before:pointer-events-none before:absolute before:inset-[-38px_-76px_-44px] before:-z-10 before:blur-[14px] before:content-[''] before:[background:var(--design-hero-halo)] max-md:before:inset-[-30px_-42px_-36px] max-md:before:[background:var(--design-hero-halo-mobile)] md:max-[899px]:before:inset-x-[-64px] md:max-[899px]:before:[background:var(--design-hero-halo-tablet)]">
              <h1 className="m-0 mx-auto max-w-[1180px] text-balance font-display text-[clamp(50px,5vw,72px)] font-normal leading-[0.94] tracking-[-0.055em] text-ink max-md:text-[clamp(44px,14vw,66px)] md:max-[899px]:max-w-[760px]">
                <span className="sr-only">{`${hero.title} ${hero.rotatingTerms.join(" - ")}`}</span>
                <span aria-hidden="true" className="block">
                  <span className="block">{hero.title}</span>
                  <span className="text-ink-secondary">
                    {typed}
                    <span className="animate-pulse">|</span>
                  </span>
                </span>
              </h1>
              <p className="mx-auto mt-[18px] max-w-[650px] font-sans text-base leading-[1.65] tracking-[-0.018em] text-ink/64 max-md:max-w-[92%] max-md:text-[15px]">
                {hero.description}
              </p>
            </div>
            <form role="search" onSubmit={handleSubmit} className="mt-[22px] w-[min(100%,610px)]">
              <div className="relative overflow-hidden rounded-[10px] bg-surface/78 shadow-[var(--design-shadow-hero-search)] backdrop-blur-[14px] backdrop-saturate-[0.86] transition-[background-color,box-shadow] duration-[180ms] ease-[ease] focus-within:bg-surface/90 focus-within:shadow-[var(--design-shadow-hero-search-focus)]">
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  placeholder={hero.searchPlaceholder}
                  aria-label={hero.searchPlaceholder}
                  className="flex h-[52px] w-full rounded-[10px] border-0 bg-transparent px-12 py-2 font-sans text-sm leading-5 tracking-[-0.14px] text-ink shadow-none outline-none placeholder:text-ink/48"
                />
                <Search
                  aria-hidden="true"
                  strokeWidth={2}
                  className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/58"
                />
                <button type="submit" className="sr-only">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="w-full min-w-0 pt-[22px] max-md:pt-[42px]">
            <CategoryRail links={categoryLinks} />
          </div>
        </div>
      </div>
    </section>
  );
}
