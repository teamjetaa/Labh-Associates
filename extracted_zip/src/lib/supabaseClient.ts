import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string;

/**
 * Custom lock with a serialized queue.
 * Supabase auth uses Web Locks by default; across browser tabs that can
 * contend and freeze the page, so we use a lightweight sequential lock instead.
 */
let previousLock: Promise<unknown> = Promise.resolve();

const serializedLock = async <T>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<T>,
): Promise<T> => {
  const run = previousLock.then(() => fn());
  previousLock = run.catch(() => undefined);
  return run;
};

const withTimeout = <T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    lock: serializedLock as unknown as typeof navigator.locks.request,
  },
  global: {
    fetch: (...args: Parameters<typeof fetch>) =>
      withTimeout(fetch(...args), 20000, new Response('{"error":"timeout"}', {
        status: 504,
        headers: { 'Content-Type': 'application/json' },
      })),
  },
});