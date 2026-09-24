import type { ServerDetail } from "../types";
import { firecrawl } from "./firecrawl";
import { elevenlabs1 } from "./elevenlabs-1";
import { magic1 } from "./magic-1";
import { browserbase } from "./browserbase";
import { exa } from "./exa";
import { tavily1 } from "./tavily-1";
import { garmin } from "./garmin";
import { flStudio } from "./fl-studio";
import { blockbench } from "./blockbench";
import { capcut } from "./capcut";
import { googleSearchConsole } from "./google-search-console";
import { yahooFinance } from "./yahoo-finance";
import { superpowers } from "./superpowers";
import { worldMonitor } from "./world-monitor";
import { ruflo } from "./ruflo";
import { openspec } from "./openspec";
import { trendradar } from "./trendradar";
import { context71 } from "./context7-1";
import { notchmate } from "./notchmate";
import { lovelyComposer } from "./lovely-composer";
import { atlias } from "./atlias";
import { researchDossier } from "./research-dossier";
import { agentSafeTools } from "./agent-safe-tools";
import { cal2 } from "./cal-2";

export const SERVER_DETAILS: Readonly<Record<string, ServerDetail>> = {
  "firecrawl": firecrawl,
  "elevenlabs-1": elevenlabs1,
  "magic-1": magic1,
  "browserbase": browserbase,
  "exa": exa,
  "tavily-1": tavily1,
  "garmin": garmin,
  "fl-studio": flStudio,
  "blockbench": blockbench,
  "capcut": capcut,
  "google-search-console": googleSearchConsole,
  "yahoo-finance": yahooFinance,
  "superpowers": superpowers,
  "world-monitor": worldMonitor,
  "ruflo": ruflo,
  "openspec": openspec,
  "trendradar": trendradar,
  "context7-1": context71,
  "notchmate": notchmate,
  "lovely-composer": lovelyComposer,
  "atlias": atlias,
  "research-dossier": researchDossier,
  "agent-safe-tools": agentSafeTools,
  "cal-2": cal2,
};
