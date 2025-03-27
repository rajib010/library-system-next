import dbConnection from "@/lib/dbConnect";
import { BookModel } from "@/model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: { isbn: string } }
) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  // console.log(session);

  if (user?.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized request",
      },
      { status: 401 }
    );
  }

  try {
    const { isbn } = await params;
    await dbConnection();
    // console.log("Book id is", bookID);

    const res = await BookModel.deleteOne({ ISBN: isbn });

    if (res.deletedCount === 0) {
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
