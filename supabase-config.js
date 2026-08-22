const SUPABASE_URL = "https://eaefuwdtscpjkzsnctrr.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);