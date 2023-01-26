import { Request } from "express";
import multer, { diskStorage } from "multer";

// process.cwd() trae la ruta de la raíz y le anexa storage, donde se almacenarán los archivos
const PATH_STORAGE = `${process.cwd()}/storage`;

// Creamos un archivo que contiene la data de almacenamiento local
const storage = diskStorage({
  // enviamos los datos del destino
  destination(req: Request, file: Express.Multer.File, cb: any) {
    // recibe un error y una ruta de almacenamiento
    cb(null, PATH_STORAGE);
  },
  // enviamos los datos del archivo
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    // le remueve la extensión al archivo ejemplo fernando.pdf, guarda el .pdf
    const ext = file.originalname.split(".").pop();
    // genera un nombre aleatorio, asignando la palabra image-numeroaleatorio.extension
    const fileNameRandom = `image-${Date.now()}.${ext}`;
    // envía un error y el nombre del archivo
    cb(null, fileNameRandom);
  },
});

// exportamos multerMiddleware la cual guarda lo que retorna la función multer con los datos de storage
export const multerMiddleware = multer({ storage });
