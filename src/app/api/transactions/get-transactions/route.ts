import { authOptions } from "../../auth/[...nextauth]/options";
import { TransactionModel } from "@/model";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import dbConnection from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }

    await dbConnection();

    const userId = user._id;

    const transaction = await TransactionModel.find({ userId }).populate(
      "bookId",
      "title"
    );

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: "Error in fetching transctions" },
        { status: 500 }
      );
    }

    if (transaction) {
      return NextResponse.json(
        { success: true, data: transaction },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error in fetching transactions", error);
    return NextResponse.json(
      { success: false, message: "Error in fetching transctions" },
      { status: 500 }
    );
  }
}
