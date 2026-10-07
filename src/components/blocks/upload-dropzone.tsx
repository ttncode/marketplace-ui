"use client";

import { useRef, useState, type DragEvent } from "react";
import { Upload, X } from "lucide-react";
import { formatBytes } from "@/lib/format";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  readonly name: string;
  readonly accept: string;
  readonly hint: string;
  readonly multiple?: boolean;
}

export function UploadDropzone({ name, accept, hint, multiple = true }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<readonly File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [skipped, setSkipped] = useState(0);
  const rules = accept.split(",").map((rule) => rule.trim()).filter(Boolean);

  const sync = (next: readonly File[]) => {
    setFiles(next);
    const transfer = new DataTransfer();
    next.forEach((file) => transfer.items.add(file));
    if (inputRef.current) inputRef.current.files = transfer.files;
  };

  const add = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const accepted = incoming.filter((file) => rules.length === 0 || rules.some((rule) => matches(file, rule)));
    setSkipped(incoming.length - accepted.length);
    if (accepted.length === 0) return sync(files); // a browse pick already replaced input.files
    sync(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--design-radius-lg)] border border-dashed border-border bg-surface px-6 py-10 text-center transition-colors hover:bg-surface-subtle has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
          dragging && "border-ink bg-surface-subtle",
        )}
      >
        <Upload aria-hidden className="size-6 text-ink-muted" />
        <span className="text-sm font-medium text-ink">Drop files here or browse</span>
        <span className="text-xs text-ink-muted">{hint}</span>
        <input ref={inputRef} type="file" name={name} accept={accept} multiple={multiple} className="sr-only" onChange={(event) => add(event.target.files)} />
      </label>
      {files.length > 0 && (
        <ul className="divide-y divide-border rounded-[var(--design-radius-md)] border border-border bg-surface text-sm">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 px-3 py-2">
              <span className="truncate text-ink">{file.name}</span>
              <span className="flex items-center gap-2 text-xs text-ink-muted">
                {formatBytes(file.size)}
                <button type="button" aria-label={`Remove ${file.name}`} onClick={() => sync(files.filter((_, i) => i !== index))} className="rounded p-1 hover:bg-accent hover:text-ink">
                  <X aria-hidden className="size-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      {skipped > 0 && (
        <p className="text-xs text-ink-muted">
          {skipped} {skipped === 1 ? "file" : "files"} skipped — type not accepted
        </p>
      )}
    </div>
  );
}

/** Same rule syntax as the `accept` attribute: ".mp4", "video/*" or "video/mp4". */
function matches(file: File, rule: string): boolean {
  if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule.toLowerCase());
  if (rule.endsWith("/*")) return file.type.startsWith(rule.slice(0, -1));
  return file.type === rule;
}
