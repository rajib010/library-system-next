import dbConnection from "@/lib/dbConnect";
import { BookModel } from "@/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnection();
  try {
   
    const { ISBN, title, author, image, year, status } = await req.json();

    //check for empty fields
    if (!ISBN || !title || !author || !image || !year) {
      return NextResponse.json(
        {
          success: false,
          message: "All the fields are required",
        },
        { status: 400 }
      );
    }

    //create a entry
    const newBook = await BookModel.create({
      ISBN,
      title,
      author,
      image,
      year,
      status,
    });

    if (!newBook) throw new Error("Cannot create a book");

    return NextResponse.json(
      {
        success: true,
        message: "Book entry created successfully",
        data: newBook,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating book", error);
    return NextResponse.json(
      { success: false, message: "Cannot create a book record" },
      { status: 500 }
    );
  }
}
