import { Request } from "express";
import { JwtPayload } from "jsonwebtoken"
import { User } from "./user.interface";

// Se extiende del tipo Request para traer sus propiedades y además anexarle 1 propiedad más.
export interface TokenDataRequest extends Request {
  email?: string | JwtPayload;
  user?: User | null;
}