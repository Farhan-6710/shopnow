import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { topic, rating, message } = await request.json();

    if (!topic || !rating || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert rating string to integer
    const ratingMap: Record<string, number> = {
      excellent: 5,
      good: 4,
      average: 3,
      poor: 2,
      "very-poor": 1,
    };

    const numericRating = ratingMap[rating] || 3; // Default to 3 if invalid

    const { data, error } = await supabase.from("feedbacks").insert({
      user_id: user.id,
      topic,
      rating: numericRating,
      message,
    });

    if (error) {
      console.error("Error inserting feedback:", error);
      return NextResponse.json(
        { success: false, error: error.message || "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
