import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnect";
import { BookModel } from "@/model";

export async function GET(req: NextRequest) {
  await dbConnection();

  try {
    const searchQuery = req.nextUrl.searchParams.get("search") || "";
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 12; 

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

    const totalBooks = await BookModel.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await BookModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit) 
      .lean();

    return NextResponse.json(
      { books, totalPages },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error in fetching book information:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get books" },
      { status: 500 }
    );
  }
}
