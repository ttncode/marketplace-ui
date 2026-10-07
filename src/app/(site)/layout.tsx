import { AnnouncementBar } from "@/components/blocks/announcement-bar";
import { NewsletterToast } from "@/components/blocks/newsletter-toast";
import { SiteFooter } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteHeader";
import { SiteOverlays } from "@/components/blocks/lead-dialog";

// Every mcpmarket.com page shares this frame; the plain Next.js 404 (as on the source) sits outside it.
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      {children}
      <SiteFooter />
      <NewsletterToast />
      <SiteOverlays />
    </>
  );
}
