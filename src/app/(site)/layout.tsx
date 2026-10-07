import { site } from "@/site.config";
import { AnnouncementBar } from "@/components/blocks/announcement-bar";
import { NewsletterToast } from "@/components/blocks/newsletter-toast";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteOverlays } from "@/components/blocks/lead-dialog";

// Every mcpmarket.com page shares this frame; the plain Next.js 404 (as on the source) sits outside it.
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader name={site.name} logo={site.logo} nav={site.nav} mobileNav={site.mobileNav} actions={site.headerActions} />
      {children}
      <SiteFooter name={site.name} logo={site.logo} footer={site.footer} socials={site.socials} />
      <NewsletterToast name={site.name} logo={site.logo} />
      <SiteOverlays />
    </>
  );
}
