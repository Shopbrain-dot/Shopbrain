const SUPABASE_URL =
  "https://wjnugjgrtdswzwldyxay.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_9Og3b_Z6fz9hBrNEYBvQ_w_iym-v3rl";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);