import { Schema, model } from "mongoose";
import { User } from "../interfaces";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "I am the description...",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // This creates a version per data change
    versionKey: false,
  }
);

// Receives the DB table name and the schema
export const UserModel = model("users", UserSchema);
