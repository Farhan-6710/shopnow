import { createClient } from "@supabase/supabase-js";
import { PRODUCTS_DATA } from "../src/constants/products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedProducts() {
  console.log("🌱 Starting to seed products...");

  try {
    // Insert all products
    const { data, error } = await supabase
      .from("products")
      .insert(PRODUCTS_DATA)
      .select();

    if (error) throw error;

    console.log(`✅ Successfully inserted ${data.length} products!`);
    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();
