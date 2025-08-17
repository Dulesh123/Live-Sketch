import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET as string;
// console.log(JWT_SECRET)
const JWT_SECRET="Dulesh@1234"

export function Authmiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token as string;
  

  if (!token) {
    return res.status(401).send("Token missing");
  }

  try {
    const authtoken = jwt.verify(token,JWT_SECRET );
    if(authtoken){
      console.log("valid true")
    }else{
      console.log("valid false")
    }

    if (typeof authtoken !== "string") {
      
      req.headers.userId = authtoken.id;
    }

    return next();
  } catch (err) {
    return res.status(403).send(err);
  }
}
