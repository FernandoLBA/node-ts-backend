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
    // Esto crea una versión por datos
    versionKey: false,
  }
);

// Recibe el nombre de la tabla en la BD y el schema
export const UploadModel = model("Uploads", UploadSchema);
