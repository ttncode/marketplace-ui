// Texture button: a 1px gradient shell around a gradient face.
const SHELL =
  "inline-flex w-full items-stretch rounded-xl border p-px font-sans font-normal transition duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const FACE =
  "flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-linear-to-b px-4 py-2 font-sans font-normal tracking-[-0.01em] whitespace-nowrap transition-[background-image,color] duration-200 ease-out motion-reduce:transition-none";

export const PRIMARY_SHELL = `${SHELL} border-ink/10 bg-linear-to-b from-primary/70 to-primary`;
export const PRIMARY_FACE = `${FACE} from-accent-raised to-primary text-primary-foreground/90 hover:from-accent-raised-hover hover:to-accent-raised/70 active:from-primary active:to-primary`;

export const SECONDARY_SHELL = `${SHELL} border-ink/20 bg-surface/50`;
export const SECONDARY_FACE = `${FACE} from-surface-muted/80 to-surface-sunken/50 text-ink-secondary hover:from-surface-sunken/40 hover:to-surface-pressed/60 active:from-surface-sunken/60 active:to-surface-pressed/70`;
