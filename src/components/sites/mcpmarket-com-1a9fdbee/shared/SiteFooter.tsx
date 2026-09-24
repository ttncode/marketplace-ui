import { LogoMarkIcon } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/icons";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { toSiteHref } from "./links";
import { OverlayTrigger } from "./SiteOverlays";
import { FOOTER, FOOTER_COLUMNS } from "./site-data";
import type { FooterColumn, FooterLink } from "./types";

const LINK_CLASS = "font-sans text-sm leading-5 text-[#616161] transition-colors duration-150 hover:text-[#0a0a0a]";

function FooterItem({ link }: { link: FooterLink }) {
  if (link.kind === "button") {
    return (
      <OverlayTrigger
        event={link.event}
        ariaLabel={link.ariaLabel}
        className={`${LINK_CLASS} inline-block w-full cursor-pointer rounded-[4px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]`}
      >
        {link.label}
      </OverlayTrigger>
    );
  }
  return (
    <a href={toSiteHref(link.href)} className={LINK_CLASS}>
      {link.label}
    </a>
  );
}

function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-xs leading-4 font-semibold tracking-[0.05em] text-[#0a0a0a] uppercase">
        {column.heading}
      </h4>
      <ul className="space-y-3 text-base leading-6">
        {column.links.map((link) => (
          <li key={link.label}>
            <FooterItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#dbdbdb] bg-white">
      <div className="w-full px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-10">
            <div className="md:col-span-2">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- clone links mirror the source site's paths, not this app's routes */}
              <a href="/" className="group mb-4 flex items-center gap-2">
                <LogoMarkIcon size={36} className="text-[#0a0a0a] transition-opacity duration-150 group-hover:opacity-80" />
                <span className="flex items-baseline text-xl leading-7 tracking-[-0.5px]">
                  <span className="font-semibold text-[#0a0a0a]">MCP</span>
                  <span className="font-medium text-[rgba(10,10,10,0.7)] italic">Market</span>
                </span>
              </a>
              <p className="max-w-[448px] font-sans text-sm leading-[1.625] text-[#616161]">{FOOTER.description}</p>
            </div>
            {FOOTER_COLUMNS.map((column) => (
              <FooterLinkColumn key={column.heading} column={column} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#dbdbdb] pt-6 md:mt-12 md:flex-row md:pt-8">
            <div className="order-2 md:order-1">
              <LanguageSwitcher />
            </div>
            <p className="order-1 font-mono text-xs leading-4 text-[#616161] md:order-2">
              {FOOTER.copyright}
              {FOOTER.legalLinks.map((link) => (
                <span key={link.href}>
                  <span className="mx-1.5">·</span>
                  <a href={link.href} className="transition-colors duration-150 hover:text-[#0a0a0a]">
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
