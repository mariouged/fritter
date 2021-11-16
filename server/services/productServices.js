const { Op } = require("sequelize");
const Product = require('../models/database/product');
const crudRepository = require('../database/crudRepository');
const { ProductIdShouldProvided } = require('../exceptions/productIdShouldProvided');

const OFFSET = 0;
const LIMIT = 10;
const DISTINCT = false;

module.exports.read = async function (dataFromController) {
    const responseObj = { status: false };
    const { name, description, price, offset, limit, distinct} = dataFromController;
    try {
        const data = {
            query : {
                where : {},
                offset: !isNaN(offset) ? +offset : OFFSET,
                limit: !isNaN(limit) ? +limit : LIMIT,
                distinct: distinct ?? DISTINCT,
            },
            model: Product,
        };

        if (name) data.query.where['name'] = {[Op.like]: `%${name}%`}
        if (description) data.query.where['description'] = {[Op.like]: `%${description}%`}
        if (price) data.query.where['price'] = {[Op.like]: `%${price}%`}
        
        const responseFromDatabase = await crudRepository.findAndCountAll(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }

    } catch (error) {
        responseObj.error = error;
        console.log('ERROR-productService-read: ', error);
    }
    return responseObj;
}

module.exports.findById = async function (id) {
    const responseObj = { status: false, result: null, error: null };
    if (!id) {
        throw new ProductIdShouldProvided();
      }
    try {
        const data = {
            id: id,
            model: Product,
        };
        const responseFromDataBase = await crudRepository.findById(data);
        if (responseFromDataBase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDataBase.result;
        }
    } catch (error) {
        responseObj.error = error;
        console.log('ERROR-productService-findById: ', error);
    }
    return responseObj;
}

module.exports.create = async function (dataFromController) {
    const responseObj = { status: false, result: null, error: null };
    const data = {
        model: Product,
        data: dataFromController
    };
    try {
        const responseFromDatabase = await crudRepository.create(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error) {
        responseObj.error = error;
        console.log('ERROR-productService-create: ', error);
    }
    return responseObj;
}