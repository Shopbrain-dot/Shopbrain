const SUPABASE_URL =
  "https://eaefuwdtscpjkzsnctrr.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZWZ1d2R0c2Nwamt6c25jdHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyOTcxNDYsImV4cCI6MjEwMjg3MzE0Nn0.AYGuDvMbszqWFoTZA80MhPOuYH7va727OjFqSZZ3Qmo";

if (!window.supabase) {
  console.error("Supabase library did not load.");
} else {
  window.supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
}