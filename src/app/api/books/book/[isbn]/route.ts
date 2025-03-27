import { BookModel } from "@/model";
import dbConnection from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { isbn: string } }
) {
  const { isbn } = await params;
  if (!params) {
    return NextResponse.json(
      { success: false, message: "ISBN required" },
      { status: 400 }
    );
  }

  try {
    await dbConnection();

    const book = await BookModel.find({ ISBN: isbn });

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book information not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, book }, { status: 200 });
  } catch (error) {
    console.log("Error in getting book infomation", error);
    return NextResponse.json(
      { success: false, message: "ISBN required" },
      { status: 400 }
    );
  }
}
