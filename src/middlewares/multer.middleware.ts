import { Request } from "express";
import multer, { diskStorage } from "multer";

// process.cwd() gets the root path and appends storage, where files will be stored
const PATH_STORAGE = `${process.cwd()}/storage`;

// Creates an object that holds the local storage config
const storage = diskStorage({
  // sends the destination data
  destination(req: Request, file: Express.Multer.File, cb: any) {
    // receives an error and a storage path
    cb(null, PATH_STORAGE);
  },
  // sends the file data
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    // strips the extension off the file, e.g. fernando.pdf keeps the .pdf
    const ext = file.originalname.split(".").pop();
    // generates a random name, using the word image-randomnumber.extension
    const fileNameRandom = `image-${Date.now()}.${ext}`;
    // sends an error and the file name
    cb(null, fileNameRandom);
  },
});

// exports multerMiddleware, which holds what the multer function returns with the storage config
export const multerMiddleware = multer({ storage });
