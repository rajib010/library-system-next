import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnection(): Promise<void> {
  // Check for existing connection
  if (connection.isConnected) {
    console.log("Database is already connected.");
    return;
  }

  try {
    // Ensure the connection URI is defined
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error("MONGODB_URI environment variable is not defined.");
    }

    const db = await mongoose.connect(dbUri, {});

    connection.isConnected = db.connections[0].readyState;
    console.log("Database is connected successfully");
  } catch (error) {
    console.error("Database connection failed:");
    // Handle production-specific error behavior or graceful shutdown
    if (process.env.NODE_ENV === "production") {
      // Implement graceful shutdown or retry logic in production
      // For now, it’s safe to exit the process in development
      process.exit(1);
    }
  }
}

export default dbConnection;
