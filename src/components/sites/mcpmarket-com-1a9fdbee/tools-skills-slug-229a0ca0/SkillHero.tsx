import Link from "next/link";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { ChevronRightIcon, GithubIcon, HomeIcon, StarIcon } from "./icons";
import { SharePopover } from "./SharePopover";
import type { SkillDetail } from "./types";

const SOURCE_ORIGIN = "https://mcpmarket.com";

const CRUMB_LINK = "rounded-md px-1 py-1 transition-colors hover:bg-black/[0.04] hover:text-[var(--design-ink)]";

function Breadcrumbs({ name }: { readonly name: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 inline-flex w-fit max-w-full self-start overflow-x-auto rounded-full border border-[rgb(0_0_0/0.08)] bg-[rgb(255_255_255/0.72)] px-2.5 py-[5px] font-sans text-[9px] leading-[1.2] font-medium tracking-[0.045em] whitespace-nowrap text-[var(--design-ink-muted)] uppercase backdrop-blur-md [scrollbar-width:none] md:mb-6 [&::-webkit-scrollbar]:hidden [&_svg]:h-3 [&_svg]:w-3"
    >
      <ol className="flex w-max min-w-0 items-center gap-1.5">
        <li className="flex items-center">
          <Link href="/" className={`-ml-1 inline-flex items-center gap-1 ${CRUMB_LINK}`}>
            <HomeIcon className="h-3 w-3" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <ChevronRightIcon className="h-3 w-3 shrink-0" />
          <Link href="/tools/skills" className={CRUMB_LINK}>
            Skills
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-1.5">
          <ChevronRightIcon className="h-3 w-3 shrink-0" />
          <span aria-current="page" className="max-w-[150px] truncate px-1 py-1 text-[var(--design-ink-secondary)] sm:max-w-xs">
            {name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function MetaRow({ skill }: { readonly skill: SkillDetail }) {
  return (
    <div className="mt-2 flex items-center gap-3 text-sm">
      <div className="flex items-center gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.author.avatar}
          alt={skill.author.name}
          width={20}
          height={20}
          className="rounded-full object-cover opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
        <span className="text-muted-foreground">by</span>
        <Link href={toSiteHref(skill.author.href)} className="font-medium text-foreground transition-colors hover:text-primary">
          {skill.author.name}
        </Link>
      </div>
      <span className="text-muted-foreground">•</span>
      <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-0.5">
        <StarIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-geist-mono text-xs font-medium text-primary">{skill.stars}</span>
      </div>
      <span className="text-muted-foreground">•</span>
      <div className="flex items-center gap-1">
        <Link
          href={toSiteHref(skill.repoHref)}
          title="GitHub"
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
        >
          <GithubIcon className="h-4 w-4" />
        </Link>
        <SharePopover url={`${SOURCE_ORIGIN}/tools/skills/${skill.slug}`} name={skill.name} />
      </div>
    </div>
  );
}

export function SkillHero({ skill }: { readonly skill: SkillDetail }) {
  return (
    <section className="design-hero-under-navigation relative overflow-hidden bg-background py-4 md:py-6 lg:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.42)_1px,transparent_0px)] bg-[length:40px_40px] [mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%_-_150px),transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/5 via-background/25 to-background" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary opacity-[0.08] blur-[180px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background via-background/80 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
        <header>
          <Breadcrumbs name={skill.name} />
          <div className="mb-6">
            <h1 className="pb-1 font-display text-3xl leading-[0.98] font-normal tracking-[-0.045em] break-words text-foreground sm:text-4xl sm:leading-10 md:text-5xl md:leading-none lg:text-6xl">
              {skill.name}
            </h1>
            <MetaRow skill={skill} />
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href={skill.category.href} title={`View all skills in ${skill.category.label} category`} className="group no-underline">
              <div className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 font-geist-mono text-xs font-light text-muted-foreground transition-colors hover:bg-accent">
                {skill.category.label}
              </div>
            </Link>
          </div>
          <p className="max-w-3xl text-base leading-relaxed font-light text-muted-foreground md:text-lg md:leading-7 lg:text-xl">
            {skill.summary}
          </p>
        </header>
      </div>
    </section>
  );
}
