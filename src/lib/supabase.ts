import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a stub during build/prerender when env vars are unavailable
    const noop = () => ({ data: null, error: null });
    const noopAsync = async () => ({ data: null, error: null });
    return {
      auth: {
        getSession: noopAsync as any,
        getUser: noopAsync as any,
        onAuthStateChange: (() => ({ data: { subscription: { unsubscribe: () => {} } } })) as any,
        signOut: noopAsync as any,
        signInWithPassword: noopAsync as any,
        signUp: noopAsync as any,
      },
      from: () => ({ select: noop, insert: noop, update: noop, delete: noop }) as any,
    } as any;
  }

  return createBrowserClient(url, key);
}
