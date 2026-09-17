import { Request, Response } from "express";
import { handleHttpError } from "../utils";
import { createFileService } from "../services/uploads.service";
import { TokenDataRequest, Upload } from "../interfaces";

/**
 * Creates a file
 * @param res
 */
export const createFile = async (
  { user, file }: TokenDataRequest,
  res: Response
) => {
  try {
    const dataToRegister: Upload = {
      // Using template strings avoids the error when the value is undefined or null
      fileName: `${file?.filename}`,
      email: `${user?.email}`,
      path: `${file?.path}`,
    };

    const data = await createFileService(dataToRegister);

    res.send({ message: "File uploaded", data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPLOADING_FILE");
  }
};
