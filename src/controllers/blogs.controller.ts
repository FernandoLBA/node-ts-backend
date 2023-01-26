import { Request, Response } from "express";

/**
 * Lista todos los blogs
 * @param req 
 * @param res 
 */
export const getBlogs = (req: Request, res: Response) => {
  res.send({data: "Listo todos los blogs"})
}

/**
 * Lista un blog por id
 * @param req 
 * @param res 
 */
export const getBlog = (req: Request, res: Response) => {
  try {
    res.send({data: "Muestro el blog" + req.params.id})
  } catch (error) {
    console.log(error)
  }
}

/**
 * Crea un blog
 * @param req 
 * @param res 
 */
export const createBlog = (req: Request, res: Response) => {
  res.send({message: "Blog creado", data: req.body})
}

/**
 * Actualiza un blog
 * @param req 
 * @param res 
 */
export const updateBlog = (req: Request, res: Response) => {
  res.send({data: "Edito un blog" + req.params.id})
}

/**
 * Elimina un blog
 * @param req 
 * @param res 
 */
export const deleteBlog = (req: Request, res: Response) => {
  res.send({data: "Elimino el blog" + req.params.id})
}