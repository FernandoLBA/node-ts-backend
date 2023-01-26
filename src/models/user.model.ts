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
      default: "Soy la descripción...",
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
    // Esto crea una versión por datos
    versionKey: false,
  }
);

// Recibe el nombre de la tabla en la BD y el schema
export const UserModel = model("users", UserSchema);
