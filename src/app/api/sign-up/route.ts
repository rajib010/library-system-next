import dbConnection from "@/lib/dbConnect";
import { UserModel } from "@/model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnection();

  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All fields (username, email, password) are required.",
        }),
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username or email already taken",
        }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role: "user", // default role
      transactions: [],
    });

    await newUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error registering user",
      }),
      { status: 500 }
    );
  }
}
