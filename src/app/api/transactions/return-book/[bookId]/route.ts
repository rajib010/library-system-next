import { NextRequest, NextResponse } from "next/server";
import { BookModel, UserModel, TransactionModel } from "@/model";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import dbConnection from "@/lib/dbConnect";
import { DateTime } from "luxon";

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

    const transaction = await TransactionModel.findOneAndUpdate(
      {
        $and: [{ userId: session?.user?._id }, { bookId }],
      },
      {
        returnDate: DateTime,
      }
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
