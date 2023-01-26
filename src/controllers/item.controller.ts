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
 * Lista todos los items
 * @param req
 * @param res
 */
export const getItems = async (req: TokenDataRequest, res: Response) => {
  try {
    const data = await getItemsService();

    res.send({ message: "Items listados", data });
  } catch (error: any) {
    handleHttpError(res, "ERROR_GETTING_ITEMS", error);
  }
};

/**
 * Lista un item por id
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

    res.send({ message: "Item listado", data });
  } catch (error) {
    handleHttpError(res, "ERROR_GETTING_ITEM", error);
  }
};

/**
 * Crea un item
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
 * Actualiza un item
 * @param req
 * @param res
 */
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await updateItemService(id, body);

    res.send({ message: "Item editado...", data: [] });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATING_ITEM", error);
  }
};

/**
 * Elimina un item
 * @param req
 * @param res
 */
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteItemService(id);

    res.send({ message: "Item eliminado", data: [] });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETING_ITEM", error);
  }
};
