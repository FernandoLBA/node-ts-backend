import { Schema, model } from "mongoose";
import { Blog } from "../interfaces";

const BlogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
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
export const BlogModel = model("blogs", BlogSchema);
