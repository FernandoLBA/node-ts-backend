import { Schema, Types, model, Model } from "mongoose";
import { Car } from "../interfaces";

const ItemSchema = new Schema<Car>(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    gas: {
      type: String,
      enum: ["gasoline", "electric"],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
export const ItemModel = model("items", ItemSchema);

// export default ItemModel;
