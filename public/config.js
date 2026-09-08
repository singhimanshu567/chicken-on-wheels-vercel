// Supabase browser configuration.
// Replace these two values with the values from Supabase.
// Use the PUBLISHABLE (or legacy anon) key here.
// NEVER put a Supabase secret/service_role key in this file.
export const SUPABASE_URL = "https://ipdnotgqmrzoosumgcfa.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_lKgFDshYS5nRAA8gKSwUgA_pVxcEhPJ";

export const SUPABASE_CONFIGURED =
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_PUBLISHABLE_KEY.length > 20;
