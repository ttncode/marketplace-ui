import type { Metadata } from "next";
import { SettingsForm } from "@/components/blocks/settings-form";
import { USER } from "@/content/dashboard";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-2xl tracking-[-0.03em]">Settings</h1>
      <SettingsForm user={USER} />
    </div>
  );
}
