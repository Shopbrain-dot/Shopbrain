const SUPABASE_URL = "https://eaefuwdtscpjkzsnctrr.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_1CmS_sPm9ScgJfFVkHxuKg_u1wSN69D";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);