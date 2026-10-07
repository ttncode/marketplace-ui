// The source's "texture" button: a 1px gradient shell around a gradient face (Tailwind v3 neutral/stone hexes).
const SHELL =
  "inline-flex w-full items-stretch rounded-xl border p-px font-sans font-normal transition duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const FACE =
  "flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-linear-to-b px-4 py-2 font-sans font-normal tracking-[-0.01em] whitespace-nowrap transition-[background-image,color] duration-200 ease-out motion-reduce:transition-none";

export const PRIMARY_SHELL = `${SHELL} border-black/10 bg-linear-to-b from-black/70 to-black`;
export const PRIMARY_FACE = `${FACE} from-[#262626] to-black text-white/90 hover:from-[#292524] hover:to-[#262626]/70 active:from-black active:to-black`;

export const SECONDARY_SHELL = `${SHELL} border-black/20 bg-white/50`;
export const SECONDARY_FACE = `${FACE} from-[#f5f5f5]/80 to-[#e5e5e5]/50 text-[#404040] hover:from-[#e5e5e5]/40 hover:to-[#d4d4d4]/60 active:from-[#e5e5e5]/60 active:to-[#d4d4d4]/70`;
