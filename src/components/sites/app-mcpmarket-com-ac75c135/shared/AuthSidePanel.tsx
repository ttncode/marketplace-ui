import { Download, ExternalLink, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toSiteHref } from "@/components/sites/mcpmarket-com-1a9fdbee/shared/links";
import { HubLockup } from "./HubLockup";
import { getBuySkillContext, getImportSkillContext, type ImportSkillContext } from "./redirect";

const PANEL_CARD = "rounded-[5px] border border-border bg-card p-6 text-left shadow-sm";
const PANEL_EYEBROW = "mb-4 flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground";

function DefaultPanel() {
  return (
    <div className="max-w-md text-center">
      <div className="mb-8 flex justify-center">
        <HubLockup size={56} className="text-foreground/90" />
      </div>
      <p className="text-lg leading-relaxed font-medium text-foreground/90">Discover and deploy MCP servers with one click</p>
    </div>
  );
}

function ImportPanel({ skill }: { readonly skill: ImportSkillContext }) {
  return (
    <div className="w-full max-w-sm">
      <div className={PANEL_EYEBROW}>
        <Download className="size-4" />
        You&apos;re downloading
      </div>
      <div className={PANEL_CARD}>
        <div className="flex items-center gap-4">
          <Image src={skill.avatarUrl} alt={skill.owner} width={48} height={48} className="size-12 rounded-full" unoptimized />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-semibold text-foreground">{skill.name}</p>
            <Link
              href={toSiteHref(skill.repoUrl)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {skill.sourceLabel}
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Create your account to add this skill to your workspace and sync it across Claude Code, Cowork, and more.
        </p>
      </div>
    </div>
  );
}

/** The source fetches price and seller from its API; with no backend it shows its fetch-failed state. */
function BuyPanel({ name }: { readonly name: string | null }) {
  return (
    <div className="w-full max-w-sm">
      <div className={PANEL_EYEBROW}>
        <ShoppingBag className="size-4" />
        You&apos;re buying
      </div>
      <div className={PANEL_CARD}>
        <div className="flex items-center justify-between gap-4">
          <p className="min-w-0 flex-1 truncate text-lg font-semibold text-foreground">{name ?? "this skill"}</p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Create your account to complete this one-time purchase. The skill is added to your workspace and synced across
          Claude Code, Cowork, and more.
        </p>
      </div>
    </div>
  );
}

export function AuthSidePanel({ redirect }: { readonly redirect: string }) {
  const importSkill = getImportSkillContext(redirect);
  if (importSkill) return <ImportPanel skill={importSkill} />;
  const buySkill = getBuySkillContext(redirect);
  if (buySkill) return <BuyPanel name={buySkill.name} />;
  return <DefaultPanel />;
}
