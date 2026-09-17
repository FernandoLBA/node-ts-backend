import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle";
import {
  getItemService,
  getItemsService,
  createItemService,
  updateItemService,
  deleteItemService,
} from "../services";
import { TokenDataRequest } from "../interfaces";

/**
 * Lists all items
 * @param req
 * @param res
 */
export const getItems = async (req: TokenDataRequest, res: Response) => {
  try {
    const data = await getItemsService();

    res.send({ message: "Items listed", data });
  } catch (error: any) {
    handleHttpError(res, "ERROR_GETTING_ITEMS", error);
  }
};

/**
 * Gets an item by id
 * @param req
 * @param res
 */
export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getItemService(id);

    if (!data) {
      handleHttpError(res, "NOT_FOUND", "", 404);

      return;
    }

    res.send({ message: "Item found", data });
  } catch (error) {
    handleHttpError(res, "ERROR_GETTING_ITEM", error);
  }
};

/**
 * Creates an item
 * @param req
 * @param res
 */
export const createItem = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const responseItem = await createItemService(body);

    res.send(responseItem);
  } catch (error) {
    handleHttpError(res, "ERROR_CREATING_ITEM", error);
  }
};

/**
 * Updates an item
 * @param req
 * @param res
 */
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await updateItemService(id, body);

    res.send({ message: "Item updated...", data: [] });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATING_ITEM", error);
  }
};

/**
 * Deletes an item
 * @param req
 * @param res
 */
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteItemService(id);

    res.send({ message: "Item deleted", data: [] });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETING_ITEM", error);
  }
};
