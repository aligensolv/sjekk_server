import { NextFunction, Request, Response } from "express"
import CustomError from "../interfaces/custom_error_class";

const ErrorHandlerMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.status).json({
        error: error.message,
    })
}


export default ErrorHandlerMiddleware