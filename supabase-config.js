const SUPABASE_URL = "https://eaefuwdtscpjkzsnctrr.supabase.co";

const SUPABASE_ANON_KEY = "PASTE_THE_CURRENT_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);