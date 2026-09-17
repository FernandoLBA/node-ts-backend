import "dotenv/config";
import mongoose, { connect } from "mongoose";

// removes the deprecation warning
mongoose.set("strictQuery", true);

async function dbConnect(): Promise<void> {
  const DB_URI = <string>process.env.DB_URI;

  await connect(DB_URI);
}

export default dbConnect;
