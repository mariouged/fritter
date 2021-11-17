export class crudRepositoryException extends Error {
    constructor (error) {
      super(error.message);
      this.name = error.name;
      this.message = error.message,
      this.errorCode = 20001,
      this.httpStatusCode = 500;
      this.validation = error.validation ?? null;
    }
  }