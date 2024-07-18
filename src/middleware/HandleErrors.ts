import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError"

export class HandleErrors {
    static execute(error: Error, req: Request, res: Response, next: NextFunction) {

        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message })
        }

        // Aqui ele verifica se o erro vem da classe AppError, se vier, ele reproduz o statusCode que está vindo de lá
        // e também retorna como json a mensagem de error 

        console.log(error)

        return res.status(500).json({ message: "Internal Server Error" })

        // Esse retorno é para casos não previstos pela minha aplicação
    }
}