import { createClient } from '@supabase/supabase-js';

//read values from env.local variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.nev.VITA_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        "Missing Supabase config. Check env.local for URL and ANON key against Supabase project settings."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
