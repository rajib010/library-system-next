import dbConnection from "@/lib/dbConnect";
import { BookModel } from "@/model";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { bookid: string } }
) {
  try {
    const bookID = params.bookid; // Access directly from destructured params
    await dbConnection();
    console.log("Book id is", bookID);

    const res = await BookModel.deleteOne({ _id: bookID });
    if (!res) {
      return NextResponse.json(
        { success: false, message: "Book not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting book:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
