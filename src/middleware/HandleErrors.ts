import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError"
import { ZodError } from "zod";

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

        // Essa instância lida com erros do Zod, que podem vir da validação do body, como no middleware ValidateBody
        console.log(error)

        return res.status(500).json({ message: "Internal Server Error" })

        // Esse retorno é para casos não previstos pela minha aplicação
    }
}