import { createClient } from "@supabase/supabase-js";

// react-router-dom precisa de um pacote de tipos (@types/react-router-dom) para funcionar corretamente com o TypeScript.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);