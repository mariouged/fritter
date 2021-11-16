class ProductIdShouldProvided extends Error {
  constructor (message) {
    super(message);
    this.name = 'ProductIdShouldProvided';
    this.httpStatusCode = 400;
  }
}

module.exports = {
  ProductIdShouldProvided,
}