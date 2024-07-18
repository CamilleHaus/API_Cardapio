export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode
    }
}

// A classe Error do JS só retorna mensagens, 
// então customizamos ela na classe AppError para podermos adicionar statusCode ao nossos erros

// A classe Error já vem com a variável message, por isso precisamos passá-la no construtor

// Usamos o super para enviar a variável para a classe original, ou seja, a de Error