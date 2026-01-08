import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProduct(itemName: string) {
  const decodedName = decodeURIComponent(itemName);

  const { data } = await supabase
    .from("products")
    .select("*")
    .ilike("name", decodedName)
    .single();

  return data;
}

export async function getAllProductNames() {
  const { data } = await supabase.from("products").select("name");
  return data || [];
}
