import { NextRequest, NextResponse } from "next/server";
import { BookModel, TransactionModel } from "@/model";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import dbConnection from "@/lib/dbConnect";

export async function POST(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized request",
      },
      { status: 401 }
    );
  }

  const bookId = await params;
  if (!bookId) {
    return NextResponse.json(
      {
        success: false,
        message: "Book id is missing and required",
      },
      { status: 401 }
    );
  }

  try {
    await dbConnection();
    console.log("Hit return book route");

    const transaction = await TransactionModel.findOneAndUpdate(
      {
        userId: user._id,
        bookId,
      },
      {
        returnDate: new Date(),
      },
      {
        new: true,
      }
    );

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "No transaction found for this book",
        },
        { status: 404 }
      );
    }
    const book = await BookModel.findByIdAndUpdate(
      bookId,
      {
        status: "available",
      },
      { new: true }
    );

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Book returned successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in returing book", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error in returing the book",
      },
      { status: 500 }
    );
  }
}
