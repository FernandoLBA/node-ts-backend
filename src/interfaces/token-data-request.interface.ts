import { Request } from "express";
import { JwtPayload } from "jsonwebtoken"
import { User } from "./user.interface";

// Extends the Request type to inherit its properties and add 1 more property.
export interface TokenDataRequest extends Request {
  email?: string | JwtPayload;
  user?: User | null;
}