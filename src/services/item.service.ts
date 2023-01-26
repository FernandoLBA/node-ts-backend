import { Car } from "../interfaces";
import { ItemModel } from "../models"

export const createItemService = async (item: Car) => {
  const responseInsert = await ItemModel.create(item);

  return responseInsert;
};

export const getItemsService = async () => {
  const response = await ItemModel.find({});

  return response;
};

export const getItemService = async (_id: string) => {
  const response = await ItemModel.findById({ _id });

  return response;
};

export const updateItemService = async (_id: string, body: Car) => {
  const response = await ItemModel.findOneAndUpdate({ _id }, body, {
    // hace que devuelva el objeto ya actualizado
    new: true
  });

  return response;
};

export const deleteItemService = async (_id: string) => {
  const response = await ItemModel.remove({ _id });

  return response;
};
