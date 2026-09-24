import { AnnouncementBar } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/AnnouncementBar";
import { NewsletterToast } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/NewsletterToast";
import { SiteFooter } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteHeader";
import { SiteOverlays } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/SiteOverlays";

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
