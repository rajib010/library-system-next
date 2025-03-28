import dbConnection from "@/lib/dbConnect";
import { BookModel } from "@/model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function PUT(
  request: Request,
  { params }: { params: { isbn: string } }
) {
  await dbConnection();

  const { isbn } = params;
  console.log("Update route hit for ISBN:", isbn);

  if (!isbn) {
    return NextResponse.json(
      { success: false, message: "ISBN is missing" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { success: false, message: "Unauthorized request" },
      { status: 401 }
    );
  }

  try {
    const { title, author, image, year, status } = await request.json();

    // Use `findOneAndUpdate` instead of fetching and updating manually
    const updatedBook = await BookModel.findOneAndUpdate(
      { ISBN: isbn },
      {
        $set: {
          title: title ?? undefined,
          author: author ?? undefined,
          image: image ?? undefined,
          year: year ?? undefined,
          status: status ?? undefined,
        },
      },
      { new: true, runValidators: true } 
    ).exec();

    if (!updatedBook) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Book updated successfully", data: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
