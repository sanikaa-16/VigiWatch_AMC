import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components (browser context).
 * Uses the public anon key only — never import service-role credentials here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
