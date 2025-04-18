import mongoose, { Schema, Document } from "mongoose";

export interface Books extends Document {
  ISBN: string;
  title: string;
  author: string;
  year: number;
  image: string;
  status: string;
}

const BookSchema: Schema<Books> = new Schema({
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x300.png?text=No+Image+Available",
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
    trim: true,
  },
});

export interface Transaction extends Document {
  bookId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  borrowDate: Date;
  returnDate: Date | null;
}

const TransactionSchema: Schema<Transaction> = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  borrowDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: null,
  },
});

export interface Users extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  transactions: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<Users> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    maxlength: 60,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required"],
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter a valid email address",
    ],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
  ],
});

export const BookModel =
  mongoose.models.Book || mongoose.model<Books>("Book", BookSchema);
export const UserModel =
  mongoose.models.User || mongoose.model<Users>("User", UserSchema);
export const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);
