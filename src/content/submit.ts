import type { SubmitContent } from "../lib/types.ts";

export const SUBMIT: SubmitContent = {
  title: "Submit a listing",
  description: "Know a tool that belongs here? Send us the details below and we will review it for inclusion.",
  fields: [
    { id: "description", label: "Description", placeholder: "What does it do?", multiline: true },
    { id: "email", label: "Contact email", placeholder: "you@example.com", multiline: false },
  ],
  submitLabel: "Submit listing",
  successTitle: "Thanks for your submission",
  successDescription: "We will review it and get back to you soon.",
};
