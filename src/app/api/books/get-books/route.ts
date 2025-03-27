import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnect";
import { BookModel } from "@/model";

export async function GET(req: NextRequest) {
  await dbConnection();

  try {
    const books = await BookModel.find({}).lean();

    return NextResponse.json(books, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error in fetching book information:", error);

    return NextResponse.json(
      { success: false, message: "Failed to get all the books" },
      { status: 500 }
    );
  }
}
