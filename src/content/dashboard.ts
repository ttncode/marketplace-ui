import type { ActivityItem, DashboardUser, PlatformOption, Stat, Video } from "../lib/types.ts";

export const USER: DashboardUser = { name: "Alex Doe", email: "alex@example.com" };

export const PLATFORMS: readonly PlatformOption[] = [
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "instagram", label: "Instagram" },
];

export const STATS: readonly Stat[] = [
  { label: "Total views", value: "128.4K", change: "+12.5%", trend: "up" },
  { label: "Scheduled posts", value: "14", change: "+3", trend: "up" },
  { label: "Published this month", value: "27", change: "0%", trend: "flat" },
  { label: "Failed uploads", value: "2", change: "-1", trend: "down" },
];

export const ACTIVITY: readonly ActivityItem[] = [
  { id: "a1", message: "Behind the scenes: studio tour published to YouTube", at: "2026-09-30T14:05:00Z" },
  { id: "a2", message: "Upload failed for Product teardown in 60 seconds", at: "2026-09-30T09:40:00Z" },
  { id: "a3", message: "Weekly recap scheduled for TikTok and Instagram", at: "2026-09-29T17:20:00Z" },
  { id: "a4", message: "Draft created: Editing tips for beginners", at: "2026-09-29T11:15:00Z" },
  { id: "a5", message: "Instagram account reconnected", at: "2026-09-28T08:00:00Z" },
];

export const VIDEOS: readonly Video[] = [
  { id: "v1", title: "Behind the scenes: studio tour", platforms: ["youtube"], status: "published", scheduledAt: "2026-09-30T14:00:00Z", views: 18420 },
  { id: "v2", title: "Product teardown in 60 seconds", platforms: ["tiktok", "instagram"], status: "failed", scheduledAt: "2026-09-30T09:30:00Z", views: 0 },
  { id: "v3", title: "Weekly recap: top moments", platforms: ["tiktok", "instagram"], status: "scheduled", scheduledAt: "2026-10-09T16:00:00Z", views: 0 },
  { id: "v4", title: "Editing tips for beginners", platforms: ["youtube"], status: "draft", scheduledAt: null, views: 0 },
  { id: "v5", title: "Q&A: your questions answered", platforms: ["youtube", "tiktok"], status: "published", scheduledAt: "2026-09-25T12:00:00Z", views: 9310 },
  { id: "v6", title: "Gear we use every day", platforms: ["instagram"], status: "published", scheduledAt: "2026-09-22T18:30:00Z", views: 5204 },
  { id: "v7", title: "Launch day countdown", platforms: ["tiktok", "youtube", "instagram"], status: "scheduled", scheduledAt: "2026-10-15T08:00:00Z", views: 0 },
  { id: "v8", title: "Ideas for next month", platforms: ["instagram"], status: "draft", scheduledAt: null, views: 0 },
  { id: "v9", title: "Customer story: from idea to launch", platforms: ["youtube"], status: "published", scheduledAt: "2026-09-15T10:00:00Z", views: 22780 },
  { id: "v10", title: "Five-minute workspace reset", platforms: ["tiktok"], status: "scheduled", scheduledAt: "2026-10-12T19:45:00Z", views: 0 },
];
