import Image from "next/image";
import Link from "next/link";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { InstallCard } from "./InstallCard";
import type { RelatedItem, SkillDetail } from "./types";

const AD = {
  href: "https://github.com/knoxgraeme/tieline",
  src: "/sites/mcpmarket-com-1a9fdbee/tools-skills-slug-229a0ca0/tieline-ad.png",
  alt: "Tieline — product intent grounded in code",
};

function RelatedList({
  label,
  more,
  items,
}: {
  readonly label: string;
  readonly more: { readonly label: string; readonly href: string };
  readonly items: readonly RelatedItem[];
}) {
  return (
    <nav aria-label={label}>
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
        <div className="flex flex-col space-y-1.5 border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg tracking-[-0.035em] text-foreground">{label}</h3>
            <Link href={more.href} className="text-xs text-muted-foreground transition-colors hover:text-primary">
              {more.label}
            </Link>
          </div>
        </div>
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group block px-4 py-4 transition-colors hover:bg-muted/50">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {item.avatar && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.avatar.src}
                        alt={item.avatar.alt}
                        width={18}
                        height={18}
                        loading="lazy"
                        className="shrink-0 rounded-full object-cover opacity-50 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    )}
                    <h3 className="font-display text-sm font-medium tracking-[-0.035em] text-foreground">{item.title}</h3>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function SkillSidebar({ skill }: { readonly skill: SkillDetail }) {
  return (
    <div className="space-y-8 lg:col-span-2">
      <div className="sticky top-24 space-y-8">
        <aside className="mt-[60px] space-y-6">
          <InstallCard downloadHref={skill.downloadHref} cliCommand={skill.cliCommand} hasExistingScan={skill.hasExistingScan} />
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Link href="/tools/skills/what-are-skills" className="transition-colors hover:text-foreground">
              What are Skills?
            </Link>
            <span>·</span>
            <Link href="/tools/skills/how-to-install" className="transition-colors hover:text-foreground">
              How to Install
            </Link>
          </div>
        </aside>
        <div aria-label="Sponsored" className="mx-auto w-full max-w-[240px]">
          <div className="relative">
            <Link
              href={toSiteHref(AD.href)}
              className="relative block overflow-hidden rounded-lg border border-border transition-colors hover:border-foreground/30"
            >
              <Image src={AD.src} alt={AD.alt} width={1080} height={1920} sizes="240px" className="h-auto w-full" />
            </Link>
            <p className="mt-2 text-center text-xs text-muted-foreground">Advertisement</p>
          </div>
        </div>
        <RelatedList label="Related Skills" more={{ label: "View more", href: skill.relatedSkillsHref }} items={skill.relatedSkills} />
        <RelatedList label="Related MCPs" more={{ label: "View all", href: "/server" }} items={skill.relatedMcps} />
      </div>
    </div>
  );
}
