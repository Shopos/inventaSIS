import { createClient  } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if(!supabaseURL || !supabaseKey){
    console.log(supabaseURL)
    console.log(supabaseKey)
    throw new Error("error variables supabase")
}

export const supabase = createClient(supabaseURL,supabaseKey)

