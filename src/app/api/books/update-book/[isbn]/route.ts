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
  const { isbn } = await params;
  console.log("update route hit");
  

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (user.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized request",
      },
      { status: 401 }
    );
  }

  try {
    await dbConnection();

    if (!isbn) {
      return NextResponse.json(
        { success: false, message: "ISBN is missing" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const book = await BookModel.findOne({ISBN:isbn})

    console.log("Book", book);

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    // Update book properties
    Object.assign(book, {
      title: data.title || book.title,
      author: data.author || book.author,
      image: data.image || book.image,
      year: data.year || book.year,
    });

    await book.save();

    return NextResponse.json(
      { success: true, message: "Book updated successfully", data: book },
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
