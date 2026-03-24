/// <reference types="vite/types/importMeta.d.ts" />
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  console.error(
    "Missing Supabase config. Check env.local for URL and ANON key against Supabase project settings.",
  );
}

export function supabaseClient() {
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
