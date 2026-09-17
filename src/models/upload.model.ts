import { Schema, model } from "mongoose";
import { Upload } from "../interfaces";

const UploadSchema = new Schema<Upload>(
  {
    fileName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    email: {
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
export const UploadModel = model("Uploads", UploadSchema);
