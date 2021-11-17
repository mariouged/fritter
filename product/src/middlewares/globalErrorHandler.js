import { resultCodes } from "../enum";

export const globalErrorHandler = async (error, req, res, next) => {
    console.log('globalErrorHandler');
  if (error) {
    console.log('call from globalErrorHandler')
    let statusCode = 500
    
    if (error?.httpStatusCode) {
      statusCode = error.httpStatusCode
    }

    res.status(statusCode).send({
      success: resultCodes.ERROR,
      error: {
          ...error,
        name: error.name,
        message: error.message,
        errorCode: error.errorCode ?? 1000,
        httpStatusCode: error.httpStatusCode ?? 500,
      }
    });

  } else {
    console.log('next call from globalErrorHandler')
    next(req, res, next);
  }
}
