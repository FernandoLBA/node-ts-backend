import { Request, Response } from "express";
import { handleHttpError } from "../utils";
import { createFileService } from "../services/uploads.service";
import { TokenDataRequest, Upload } from "../interfaces";

/**
 * Crea un archivo
 * @param res
 */
export const createFile = async (
  { user, file }: TokenDataRequest,
  res: Response
) => {
  try {
    const dataToRegister: Upload = {
      // Usar template strings te salta el error de si el valor es undefined o null
      fileName: `${file?.filename}`,
      email: `${user?.email}`,
      path: `${file?.path}`,
    };

    const data = await createFileService(dataToRegister);

    res.send({ message: "Archivo subido", data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPLOADING_FILE");
  }
};
