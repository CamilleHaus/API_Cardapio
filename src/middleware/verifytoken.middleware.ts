import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError"

export class VerifyToken {
    static execute(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        // A autorização vem através do cabeçalh da requisição

        const token = authorization?.replace("Bearer ", "");

        // Limpando o token. Tirando a palavra bearer para poder fazer a verificação 

        if(!token) {
            throw new AppError("Token is required", 401)
        }

        jwt.verify(token, process.env.JWT_SECRET as string);

        res.locals.decode = jwt.decode(token)

        // Caso passe pelas verificações, decodificamos o token e armazenamos no locals para usarmos na aplicação

        next();

    }
}