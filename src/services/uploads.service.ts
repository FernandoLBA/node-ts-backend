import { Upload } from "../interfaces";
import { UploadModel } from "../models";

export const createFileService = async (file: Upload) => {
  const response = await UploadModel.create(file);

  return response;
};
