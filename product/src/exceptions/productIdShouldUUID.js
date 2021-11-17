export class ProductIdShouldUUID extends Error {
    constructor (message) {
      super(message);
      this.name = 'ProductIdShouldUUID';
      this.message = "Product id should be type of UUID",
      this.errorCode = 10002,
      this.httpStatusCode = 400;
    }
  }