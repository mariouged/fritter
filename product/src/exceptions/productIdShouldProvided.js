export class ProductIdShouldProvided extends Error {
  constructor (message) {
    super(message);
    this.name = 'ProductIdShouldProvided';
    this.message = "Product id should be provided",
    this.errorCode = 10001,
    this.httpStatusCode = 400;
  }
}