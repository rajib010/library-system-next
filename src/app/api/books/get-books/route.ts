import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnect";
import { BookModel } from "@/model";

export async function GET(req: NextRequest) {
  await dbConnection();

  try {
    const searchQuery = req.nextUrl.searchParams.get("search") || "";

    let filter = {};
    if (searchQuery) {
      filter = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { author: { $regex: searchQuery, $options: "i" } },
          { ISBN: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const books = await BookModel.find(filter).lean();

    console.log("Books from the db", books);

    return NextResponse.json(books, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error in fetching book information:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get books" },
      { status: 500 }
    );
  }
}
