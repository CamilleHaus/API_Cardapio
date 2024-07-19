import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export class ValidateBody {
    static execute(schemas: ZodSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            req.body = schemas.parse(req.body);

            next();
        }
    }
}

// Colocamos como parametro o Schemas para podermos validar diferentes tipos de corpos de requisição
// Adicionamos uma callback no retorno para execurtamos o middleware de fato

// Utilizamos o parse para limparmos todas as chaves desnecessárias que chegarem através do corpo de requisição e que não baterem com
// o seu respectivio schema

// Colocamos uma instancia de Erro lá no HandleErros para lidar com erros do Zod