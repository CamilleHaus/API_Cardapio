import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError"
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrors {
    static execute(error: Error, req: Request, res: Response, next: NextFunction) {

        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message })
        }

        // Aqui ele verifica se o erro vem da classe AppError, se vier, ele reproduz o statusCode que está vindo de lá
        // e também retorna como json a mensagem de error 

        if( error instanceof ZodError) {
            return res.status(409).json(error)
        }

        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ messsage: error.message });
         }

        // Essa instância lida com erros do Zod, que podem vir da validação do body, como no middleware ValidateBody
        console.log(error)

        return res.status(500).json({ message: "Internal Server Error" })

        // Esse retorno é para casos não previstos pela minha aplicação
    }
}