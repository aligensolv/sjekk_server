const ErrorHandlerMiddleware = (error, req, res, next) => {
    console.log(error.message);

    return res.status(error.status).json({
        error: error.message,
    })
}


export default ErrorHandlerMiddleware