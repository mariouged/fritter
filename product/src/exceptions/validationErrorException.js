export class validationErrorException extends Error {
    constructor (error) {
      super(error.message);
      this.name = error.name;
      this.message = 'Validation error',
      this.errorCode = 20002,
      this.httpStatusCode = 422;
      this.validation = this.extractValidations(error);
    }
    extractValidations(error) {
        if(!error.errors) {
            return null;
        }
        const validationMsg = {}
        error.errors.map( err => {
            validationMsg[err.path] = err.message;
        });
        return validationMsg;
    }
  }