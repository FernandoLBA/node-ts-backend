import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 * Retorna el nombre sin la extensión .ts
 * @param fileName 
 * @returns 
 */
const cleanFileName = (fileName: String) => {
  return fileName.split(".").shift(); 
}

/**
 * Lee la carpeta de routes y retorna un array
 */
readdirSync(PATH_ROUTER).map((fileName) => {
  const cleanName = (cleanFileName(fileName));

  console.log("Cargando ruta:", cleanName);

  if(cleanName !== "index"){
    /**
      * Se importa de manera dinámica el "módulo de rutas", esto retorna una promesa
      */
    import(`./${cleanName}.route`).then((moduleRouter) => {
      // Cada módulo retorna un objeto con la propiedad router, por eso colocamos moduleRouter.router
      router.use(`/${cleanName}`, moduleRouter.router);
    })
  }
});

export { router };
