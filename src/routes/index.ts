import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 * Returns the file name without the .ts extension
 * @param fileName
 * @returns
 */
const cleanFileName = (fileName: String) => {
  return fileName.split(".").shift();
}

/**
 * Reads the routes folder and returns an array
 */
readdirSync(PATH_ROUTER).map((fileName) => {
  const cleanName = (cleanFileName(fileName));

  console.log("Loading route:", cleanName);

  if(cleanName !== "index"){
    /**
      * Dynamically imports the "route module", this returns a promise
      */
    import(`./${cleanName}.route`).then((moduleRouter) => {
      // Each module returns an object with the router property, that's why we use moduleRouter.router
      router.use(`/${cleanName}`, moduleRouter.router);
    })
  }
});

export { router };
