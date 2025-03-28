import dbConnection from "@/lib/dbConnect";
import { TransactionModel } from "@/model";
import { UserModel } from "@/model";
import { BookModel } from "@/model";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


export async function POST(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const { bookId } = await params;

  const _id = bookId;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return NextResponse.json(
      { success: false, message: "Invalid book ID" },
      { status: 400 }
    );
  }

  console.log("id from params:", bookId);

  // Check if bookId exists
  if (!bookId) {
    return NextResponse.json(
      { success: false, message: "Book id is missing and required" },
      { status: 401 }
    );
  }

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized request" },
      { status: 401 }
    );
  }

  try {
    await dbConnection();
    const userId = user?._id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is missing" },
        { status: 400 }
      );
    }

    const book = await BookModel.findByIdAndUpdate(
      _id,
      {
        status: "unavailable",
      },
      { new: true }
    );

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    const userFromDb = await UserModel.findById(userId);
    if (!userFromDb) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    console.log("user from db", userFromDb);

    const newTrans = await TransactionModel.create({
      bookId,
      userId,
      borrowDate: Date.now(),
    });

    userFromDb.transactions.push(newTrans);
    await userFromDb.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Error in borrowing book",
      },
      { status: 500 }
    );
  }
}
