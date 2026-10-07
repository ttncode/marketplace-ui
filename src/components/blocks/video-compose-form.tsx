"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PlatformPicker } from "@/components/blocks/platform-picker";
import { ScheduleField } from "@/components/blocks/schedule-field";
import { UploadDropzone } from "@/components/blocks/upload-dropzone";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { PlatformOption } from "@/lib/types";

const SIMULATED_REQUEST_MS = 900;

interface VideoComposeFormProps {
  readonly platforms: readonly PlatformOption[];
  readonly defaultTitle?: string;
  readonly defaultPlatforms?: readonly string[];
}

export function VideoComposeForm({ platforms, defaultTitle = "", defaultPlatforms = [] }: VideoComposeFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (new FormData(event.currentTarget).getAll("platforms").length === 0) {
      setError("Choose at least one platform");
      return;
    }
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => router.push("/app/videos"), SIMULATED_REQUEST_MS);
  };

  return (
    <form
      onSubmit={onSubmit}
      onChange={(event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.type === "checkbox" && target.name === "platforms" && target.checked) setError(null);
      }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-ink">Title</label>
        <Input id="title" name="title" defaultValue={defaultTitle} required maxLength={100} placeholder="Behind the scenes" />
      </div>
      <div className="space-y-2">
        <label htmlFor="caption" className="text-sm font-medium text-ink">Caption</label>
        <Textarea id="caption" name="caption" maxLength={2200} placeholder="Write a caption…" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">Video</p>
        <UploadDropzone name="media" accept="video/*" hint="MP4 or MOV, up to 1 GB" multiple={false} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">Platforms</p>
        <PlatformPicker name="platforms" options={platforms} defaultValue={defaultPlatforms} describedBy={error ? "platforms-error" : undefined} invalid={error !== null} />
        {error && <p id="platforms-error" role="alert" className="text-sm text-destructive">{error}</p>}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">Schedule</p>
        <ScheduleField name="publishAt" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" disabled={submitting} onClick={() => router.push("/app/videos")}>
          Save draft
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </form>
  );
}
